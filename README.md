## JS性能研究

### 性能基准
`src/basic/blank`

```
//得分：
blank x 94,854,163 ops/sec ±1.39% (88 runs sampled)
blank x 93,090,362 ops/sec ±2.17% (87 runs sampled)
blank is 1.02x faster than blank
```

#### 结论
本机器运行测试性能基准约为94,000,000 ops/sec


### 类的上下文赋值 vs 函数Scope赋值
`src/basic/assign`

```
//this.a = 0
//vs
//a = 0

//得分：
assign to class context x 49.29 ops/sec ±1.24% (61 runs sampled)
assign to fn scope x 49.05 ops/sec ±1.48% (61 runs sampled)
assign to class context is 1.00x faster than assign to fn scope
```

#### 结论
不同类型赋值，对性能影响不大


### if(value) vs if(true)
`src/basic/if`

```
//if(123)
//vs
//if(true)

//得分：
if(value) x 4,915 ops/sec ±1.33% (83 runs sampled)
if(true) x 5,314 ops/sec ±1.53% (83 runs sampled)
if(true) is 1.08x faster than if(value)
```

#### 结论
条件判断，使用字符串等非Boolean，性能会比直接用true/false差


### 查找算法对比
`src/basic/mapIndexOf`

```
//arr.indexOf(item)
//vs
//arr[item]
//vs
//arrMap[item]

//得分：
indexOf x 3,538 ops/sec ±2.81% (81 runs sampled)
arrayMap x 74,238,355 ops/sec ±1.47% (82 runs sampled)
map x 76,447,339 ops/sec ±1.79% (81 runs sampled)
map is 2.16e+4x faster than indexOf
```

#### 结论
使用Map来查找，比IndexOf有 21,600x 性能提升，不论是Array还是Object

### 获取字符串子集
`src/basic/sliceString`

在循环时，为了验证以下方式性能：
* 通过cursor移动一次性通过`substring`拉取字符串
* 每次循环往字符串上加字符
* 先加到tmp数组，再join

```
//得分：
substring x 42,357,235 ops/sec ±1.77% (81 runs sampled)
+= x 448,126 ops/sec ±0.98% (83 runs sampled)
arrayJoin x 436,649 ops/sec ±1.47% (83 runs sampled)
substring is 97.0x faster than arrayJoin
```

#### 结论
通过substring获取字符串子集有 97x 性能提升


### CharAt & CharCodeAt性能对比
`src/method/charAt.js`


```
//得分：
charAt x 75,476,300 ops/sec ±1.55% (83 runs sampled)
charCodeAt x 30,779,466 ops/sec ±1.07% (82 runs sampled)
charAt is 2.45x faster than charCodeAt
```

#### 结论
CharAt比CharCodeAt提升 2.45x 性能

### typeof 性能测评
`src/method/typeof.js`


```
//得分：
typeof x 89,144,794 ops/sec ±1.70% (87 runs sampled)
typeof x 89,337,454 ops/sec ±1.54% (88 runs sampled)
typeof is 1.00x faster than typeof
```

#### 结论
typeof属于原生基本操作，速度炒鸡快，基本无视性能使用


### == / === 性能测评
`src/basic/equal.js`


```
//得分：
=== x 90,951,007 ops/sec ±1.63% (86 runs sampled)
== x 92,248,630 ops/sec ±1.37% (85 runs sampled)
== is 1.01x faster than ===
```

#### 结论
经多次测试，=== / ==，性能基本一致，原生基本预算符，速度炒鸡快，基本无视性能使用


### 基于typeof的类型判断函数 性能测评
`src/method/isString.js`


```
//得分：
isString x 60,567,982 ops/sec ±1.79% (86 runs sampled)
isString x 68,846,974 ops/sec ±1.05% (87 runs sampled)
isString is 1.14x faster than isString
```

#### 结论
typeof属于原生基本操作，速度炒鸡快，基本无视性能使用


### for...of 与 for...in 性能测评

`src/basic/for.js`

```
// 得分：
for...in has similar performancem with for...of (1.76x)
```

#### 结论

最快还是for...in，比for...of会快一倍多，加上有时候会配合entries导致会更慢一些