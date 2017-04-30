## JS性能研究

### 类的上下文赋值 vs 函数Scope赋值


```
//this.a = 0
//vs
//a = 0

//得分：
assign to class context x 48.97 ops/sec ±1.36% (61 runs sampled)
assign to fn scope x 48.87 ops/sec ±1.49% (60 runs sampled)
```

结论，不同类型赋值，对性能影响不大