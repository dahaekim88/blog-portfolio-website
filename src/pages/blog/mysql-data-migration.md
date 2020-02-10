---
title: "Data Migration (NodeJS + MySQL)"
date: 2019-01-13T14:58:00.000Z
tags: ["database", "migration", "nodejs", "mysql"]
category: blog
open: true
---

<br />

### Data Migration

- **NodeJS 활용하여 데이터 옮기기**

  이번 프로젝트에서는 수많은 양의 데이터를 만질 기회가 있었는데, 가장 먼저 선행되어야 할 작업이 바로 데이터 마이그레이션이었다. 기존에 엉망으로 구성되어 있던 데이터베이스를 가지고, 테이블 간의 관계를 명확하게 설정한 다음, 기존 데이터의 중복과 불일치를 필터링하여 데이터 마이그레이션 작업을 진행하는데 심혈을 기울였다.

  우선 CLI를 통해서 일일이 하나 하나 테이블마다 수작업으로 데이터를 옮기기 보단, NodeJS를 사용해서 데이터를 가져올 데이터베이스에 먼저 접속하여 불러온 데이터를 가공한 다음, 데이터를 옮겨 넣을 데이터베이스에 다시 접속하여 가공된 데이터를 한 번에 insert 하기로 결정했다.

  한 번 데이터 마이그레이션을 위한 코드를 셋업해 두니, 마이그레이션 도중 오류가 발생할 때에도 언제든지 테이블을 날리고 약간의 코드 수정 후 그냥 간단하게 node를 다시 실행시킴으로써 마이그레이션을 진행할 수 있어 매우 편리하였고, 자바스크립트로 원하는 대로 데이터를 가공하기도 용이하여 작업이 생각보다 매우 순조롭게 진행되었다.
  <br />

- **bulk inserts는 어떻게?**

  대량의 데이터를 한꺼번에 insert 하고 싶은 경우에는, nested arrays가 grouped list로 변환된다. 즉, `[['a', 'b'], ['c', 'd']]` 이러한 형태의 nested arrays가 `('a', 'b'), ('c', 'd')`와 같이 insert문의 values로 전달할 수 있는 그룹별로 묶어진 리스트 형태로 변한다.

  따라서 쿼리의 결과값으로 받은 array of objects를 nested array로 다시 변환한 다음, query() 메서드의 두 번째 인자로 전달하는 values 값으로 넘겨주면 된다.

**>> 직접 데이터 마이그레이션에 사용했던 코드 예제**

```javascript
const mysql = require("mysql")

const migrate = async () => {
  let conn = mysql.createConnection({
    host: "호스트 이름",
    user: "유저명",
    password: "패스워드",
    database: "데이터를 넘겨줄 데이터베이스명",
  })

  conn.connect()

  const selectSql = `SELECT 필드명1, 필드명2 FROM 테이블명;`

  const results = await new Promise((resolve, reject) => {
    conn.query(selectSql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })

  const values = results
    .filter(result => {
      if (result.필드명1 === "" || result.필드명2 === "") {
        return false
      }
      return true
    })
    .map(result => {
      return [result.필드명1, result.필드명2]
    })

  conn = mysql.createConnection({
    host: "호스트 이름",
    user: "유저명",
    password: "패스워드",
    database: "데이터를 옮겨올 데이터베이스명",
  })

  const insertSql = `INSERT INTO 테이블명(필드명1, 필드명2) VALUES ?`

  const insertResult = await new Promise((resolve, reject) => {
    conn.query(insertSql, [values], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })

  conn.end()
}

migrate()
```

<br />

### 두 개 이상 테이블 조인하기

- **테이블 조인시, `INNER JOIN ~ ON 절` 을 쓰는 것과 `WHERE 절` 을 쓰는 것의 차이**

  평소 조인 관련해서는 INNER JOIN을 주로 가장 많이 사용하게 되는데, 가끔씩 INNER JOIN을 사용하지 않고, 그냥 여러 테이블 명을 나열한 다음 조인되는 컬럼을 WHERE 절에 넣어 데이터를 불러오는 경우를 종종 보았다. 그래서 대체 이 차이점이 뭔가 싶어서 두 가지 방식으로 다 쿼리를 작성해 봤으나, 결과가 동일하게 나왔다.

  하지만 조인된 컬럼을 WHERE 절에 넣게 되면, WHERE 절에 있는 또 다른 조건들과 혼합되기 때문에 좋은 방식이 아니라고 한다. 조인되는 컬럼들은 ON 절에 별도로 쓰고, 그 외에 추가 되는 조건들을 WHERE 절에 추가함으로써 좀 더 명확하고 직관적인 쿼리문을 작성할 수 있는 듯 하다.

### 서브쿼리 활용하기

서브쿼리(Sub Query) 라고 하면 막상 어렵게 생각하는 사람들이 꽤 있는데, 말 그대로 보조적인(Sub) 역할을 하는 쿼리이기 때문에, 기존에 잘 알고 있는 Select 쿼리문을 또 다른 쿼리문 내부에 추가로 작성한다고 생각하면 된다.

간단하게 아래의 예제 코드를 참고해 보면, 클라이언트로부터 전달받은 params의 브랜드명에 해당하는 브랜드 id값을 select 쿼리로 찾은 다음, 그 데이터를 바로 다른 테이블의 select 쿼리문의 WHERE 절 비교 값으로 넘겨줄 수 있다.

```sql
SELECT car_series
FROM car_series
WHERE car_brand_id = (
    SELECT car_brand_id FROM car_brand WHERE car_brand = ${req.params.brand}
);
```

<br />

- **서브쿼리로 insert 하기**

  가장 위에서 언급했던 NodeJS를 이용한 데이터 마이그레이션을 하기로 결정하기 전에, 그냥 간단하게 각기 다른 두 데이터베이스 간 데이터 이동은 어떻게 하나 먼저 테스트를 해보았는데, 이 때 역시 사용될 수 있는 방법도 바로 서브쿼리였다. select하여 insert하는 두 테이블 간의 필드가 동일하다면 서브쿼리로 불러낸 값을 바로 VALUES 값으로 넘길 수가 있다.

  아래 예제 코드에서는 기존의 데이터베이스에는 의미없이 중복되는 값이 매우 많았기 때문에 DISTINCT로 중복된 값을 걸러낸 다음 바로 새로운 데이터베이스에 insert 할 수 있었다.

  ```sql
  INSERT INTO carkorea2.car_brand(car_brand, car_origin)
  SELECT DISTINCT car_brand, car_type
  FROM carkorea.car_series;
  ```

<br />

- **서브쿼리로 join 하기**

```sql
SELECT DISTINCT c1.car_option, c1.car_option_price
FROM carkorea.car_grade_option c1 INNER JOIN (
    SELECT c2m.car_model, c2d.car_model_id, c2d.car_detail
    FROM carkorea2.car_model c2m INNER JOIN carkorea2.car_model_detail c2d
    ON c2m.car_model_id = c2d.car_model_id
	) as c2
ON c1.car_model = c2.car_model AND c1.car_model_detail = c2.car_detail;
```
