var documenterSearchIndex = {"docs":
[{"location":"order_functions/#Order-Functions-1","page":"Order Functions","title":"Order Functions","text":"","category":"section"},{"location":"order_functions/#Optimized-for-Order-1","page":"Order Functions","title":"Optimized for Order","text":"","category":"section"},{"location":"order_functions/#","page":"Order Functions","title":"Order Functions","text":"StaticRanges.ordmax\nStaticRanges.ordmin\nStaticRanges.find_max\nStaticRanges.find_min\nStaticRanges.is_within\nStaticRanges.gtmax\nStaticRanges.ltmax\nStaticRanges.eqmax\nStaticRanges.gtmin\nStaticRanges.ltmin\nStaticRanges.eqmin\nStaticRanges.group_max\nStaticRanges.group_min\nStaticRanges.cmpmax\nStaticRanges.cmpmin\nStaticRanges.min_of_group_max\nStaticRanges.max_of_group_min","category":"page"},{"location":"order_functions/#StaticRanges.ordmax","page":"Order Functions","title":"StaticRanges.ordmax","text":"ordmax(x) = ordmax(x, order(x))\nordmax(x::T, ::Ordering) -> T\n\nFinds the maximum of x using information about its ordering.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.ordmin","page":"Order Functions","title":"StaticRanges.ordmin","text":"ordmin(x) = ordmin(x, order(x))\nordmin(x::T, ::Ordering) -> T\n\nFinds the minimum of x using information about its ordering.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.find_max","page":"Order Functions","title":"StaticRanges.find_max","text":"find_max(x)\n\nReturns the index of the maximum value for x. Differes from findmax by accounting for any sorting.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.find_min","page":"Order Functions","title":"StaticRanges.find_min","text":"find_min(x)\n\nReturns the index of the minimum value for x. Differes from findmin by accounting for any sorting.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.is_within","page":"Order Functions","title":"StaticRanges.is_within","text":"is_within(x, y) -> Bool\n\nReturns true if all of x is found within y.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.gtmax","page":"Order Functions","title":"StaticRanges.gtmax","text":"gtmax(x, y) -> Bool\n\nReturns true if the maximum of x is greater than that of y.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.ltmax","page":"Order Functions","title":"StaticRanges.ltmax","text":"ltmax(x, y) -> Bool\n\nReturns true if the maximum of x is less than that of y.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.eqmax","page":"Order Functions","title":"StaticRanges.eqmax","text":"eqmax(x, y) -> Bool\n\nReturns true if the maximum of x and y are equal.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.gtmin","page":"Order Functions","title":"StaticRanges.gtmin","text":"gtmin(x, y) -> Bool\n\nReturns true if the minimum of x is greater than that of y.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.ltmin","page":"Order Functions","title":"StaticRanges.ltmin","text":"ltmin(x, y) -> Bool\n\nReturns true if the minimum of x is less than that of y.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.eqmin","page":"Order Functions","title":"StaticRanges.eqmin","text":"eqmin(x, y) -> Bool\n\nReturns true if the minimum of x and y are equal.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.group_max","page":"Order Functions","title":"StaticRanges.group_max","text":"group_max(x, y[, z...])\n\nReturns the maximum value of all collctions.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.group_min","page":"Order Functions","title":"StaticRanges.group_min","text":"group_min(x, y[, z...])\n\nReturns the minimum value of all collctions.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.cmpmax","page":"Order Functions","title":"StaticRanges.cmpmax","text":"cmpmax(x, y)\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.cmpmin","page":"Order Functions","title":"StaticRanges.cmpmin","text":"cmpmin(x, y)\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.min_of_group_max","page":"Order Functions","title":"StaticRanges.min_of_group_max","text":"min_of_group_max(x, y)\n\nReturns the minimum of maximum of x and y. Functionally equivalent to min(maximum(x), maximum(y)) but uses trait information about ordering for improved performance.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.max_of_group_min","page":"Order Functions","title":"StaticRanges.max_of_group_min","text":"max_of_group_min(x, y)\n\nReturns the maximum of minimum of x and y. Functionally equivalent to max(minimum(x), minimum(y)) but uses trait information about ordering for improved performance.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#Search-and-Sort-1","page":"Order Functions","title":"Search and Sort","text":"","category":"section"},{"location":"order_functions/#Order-traits-1","page":"Order Functions","title":"Order traits","text":"","category":"section"},{"location":"order_functions/#","page":"Order Functions","title":"Order Functions","text":"Internally it provides an intermediate structure for chaining functions an arbitrary number of functions.","category":"page"},{"location":"order_functions/#","page":"Order Functions","title":"Order Functions","text":"julia> fxn1 = <(4) | >(8)\n(::StaticRanges.ChainedFix{typeof(|),Base.Fix2{typeof(<),Int64},Base.Fix2{typeof(>),Int64}}) (generic function with 3 methods)\n\njulia> fxn2 = <(4) | >(8) & iseven\n(::StaticRanges.ChainedFix{typeof(|),Base.Fix2{typeof(<),Int64},StaticRanges.ChainedFix{typeof(&),Base.Fix2{typeof(>),Int64},typeof(iseven)}}) (generic function with 3 methods)\n\njulia> fxn1(10)\ntrue\n\njulia> fxn1(11)\ntrue\n\njulia> fxn2(10)\ntrue\n\njulia> fxn2(11)\nfalse","category":"page"},{"location":"order_functions/#","page":"Order Functions","title":"Order Functions","text":"This becomes particularly useful when trying to preserve a range in a type stable manner. Without knowing the specific functions that compose the conditional operator in findall at compile time it's impossible to determine whether the output should be a continuous range or discrete vector.","category":"page"},{"location":"order_functions/#","page":"Order Functions","title":"Order Functions","text":"julia> findall(i -> >(4)(i) & <(8)(i), fr)\n2-element Array{Int64,1}:\n 3\n 4\n\njulia> find_all(>(4) & <(8), fr)\n3:4","category":"page"},{"location":"order_functions/#","page":"Order Functions","title":"Order Functions","text":"StaticRanges.find_first\nStaticRanges.find_last\nStaticRanges.merge_sort\nStaticRanges.vcat_sort","category":"page"},{"location":"order_functions/#StaticRanges.find_first","page":"Order Functions","title":"StaticRanges.find_first","text":"find_first(predicate::Function, A)\n\nReturn the index or key of the first element of A for which predicate returns true. Return nothing if there is no such element.\n\nIndices or keys are of the same type as those returned by keys(A) and pairs(A).\n\nExamples\n\njulia> using StaticRanges\n\njulia> A = [1, 4, 2, 2];\n\njulia> find_first(iseven, A)\n2\n\njulia> find_first(x -> x>10, A) # returns nothing, but not printed in the REPL\n\njulia> find_first(isequal(4), A)\n2\n\njulia> find_first(iseven, [1 4; 2 2])\nCartesianIndex(2, 1)\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.find_last","page":"Order Functions","title":"StaticRanges.find_last","text":"find_last(predicate::Function, A)\n\nReturn the index or key of the last element of A for which predicate returns true. Return nothing if there is no such element.\n\nIndices or keys are of the same type as those returned by keys(A) and pairs(A).\n\nExamples\n\njulia> using StaticRanges\n\njulia> find_last(iseven, [1, 4, 2, 2])\n4\n\njulia> find_last(x -> x>10, [1, 4, 2, 2]) # returns nothing, but not printed in the REPL\n\njulia> find_last(isequal(4), [1, 4, 2, 2])\n2\n\njulia> find_last(iseven, [1 4; 2 2])\nCartesianIndex(2, 2)\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.merge_sort","page":"Order Functions","title":"StaticRanges.merge_sort","text":"merge_sort(x, y)\n\nMerge's and sorts collections x, and y.\n\n\n\n\n\n","category":"function"},{"location":"order_functions/#StaticRanges.vcat_sort","page":"Order Functions","title":"StaticRanges.vcat_sort","text":"vcat_sort(x, y)\n\nReturns a sorted concatenation of x and y.\n\nExamples\n\njulia> using StaticRanges\n\njulia> vcat_sort(1:10)  # it's already sorted, nothing happens\n1:10\n\njulia> vcat_sort([3, 1, 2, 5])  # sort unordered collection\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 5\n\n\njulia> vcat_sort([3, 4, 5], [1, 2, 5])\n6-element Array{Int64,1}:\n 1\n 2\n 3\n 4\n 5\n 5\n\n\n\n\n\n\n","category":"function"},{"location":"quick_start/#Quick-Start-1","page":"Quick Start","title":"Quick Start","text":"","category":"section"},{"location":"quick_start/#","page":"Quick Start","title":"Quick Start","text":"The majority of range types in this package can be constructed using two methods srange and mrange.","category":"page"},{"location":"quick_start/#","page":"Quick Start","title":"Quick Start","text":"StaticRanges.srange\nStaticRanges.mrange","category":"page"},{"location":"quick_start/#StaticRanges.srange","page":"Quick Start","title":"StaticRanges.srange","text":"srange(start[, stop]; length, stop, step=1)\n\nConstructs static ranges within similar syntax and argument semantics as range.\n\nExamples\n\njulia> using StaticRanges\n\njulia> srange(1, length=100)\nUnitSRange(1:100)\n\njulia> srange(1, stop=100)\nUnitSRange(1:100)\n\njulia> srange(1, step=5, length=100)\nStepSRange(1:5:496)\n\njulia> srange(1, step=5, stop=100)\nStepSRange(1:5:96)\n\njulia> srange(1, step=5, stop=100)\nStepSRange(1:5:96)\n\njulia> srange(1, 10, length=101)\nStepSRangeLen(1.0:0.09:10.0)\n\njulia> srange(1, 100, step=5)\nStepSRange(1:5:96)\n\njulia> srange(1, 10)\nUnitSRange(1:10)\n\njulia> srange(1.0, length=10)\nStepSRangeLen(1.0:1.0:10.0)\n\n\n\n\n\n\n","category":"function"},{"location":"quick_start/#StaticRanges.mrange","page":"Quick Start","title":"StaticRanges.mrange","text":"mrange(start[, stop]; length, stop, step=1)\n\nConstructs static ranges within similar syntax and argument semantics as range.\n\nExamples\n\njulia> using StaticRanges\n\njulia> mrange(1, length=100)\nUnitMRange(1:100)\n\njulia> mrange(1, stop=100)\nUnitMRange(1:100)\n\njulia> mrange(1, step=5, length=100)\nStepMRange(1:5:496)\n\njulia> mrange(1, step=5, stop=100)\nStepMRange(1:5:96)\n\njulia> mrange(1, step=5, stop=100)\nStepMRange(1:5:96)\n\njulia> mrange(1, 10, length=101)\nStepMRangeLen(1.0:0.09:10.0)\n\njulia> mrange(1, 100, step=5)\nStepMRange(1:5:96)\n\njulia> mrange(1, 10)\nUnitMRange(1:10)\n\njulia> mrange(1.0, length=10)\nStepMRangeLen(1.0:1.0:10.0)\n\n\n\n\n\n","category":"function"},{"location":"traits/#Traits-1","page":"Traits","title":"Traits","text":"","category":"section"},{"location":"traits/#Comparing-Static,-Mutable,-and-Immutable-Types-1","page":"Traits","title":"Comparing Static, Mutable, and Immutable Types","text":"","category":"section"},{"location":"traits/#","page":"Traits","title":"Traits","text":"The difference between each type of range is conceptualized as \"static\", \"fixed\", or \"dynamic\".","category":"page"},{"location":"traits/#","page":"Traits","title":"Traits","text":"StaticRanges.is_dynamic\nStaticRanges.is_static\nStaticRanges.is_fixed\n\nStaticRanges.as_dynamic\nStaticRanges.as_static\nStaticRanges.as_fixed","category":"page"},{"location":"traits/#StaticRanges.is_dynamic","page":"Traits","title":"StaticRanges.is_dynamic","text":"is_dynamic(x) -> Bool\n\nReturns true if the size of x is dynamic/can change.\n\nExamples\n\njulia> using StaticRanges\n\njulia> sr = UnitSRange(1, 10)\nUnitSRange(1:10)\n\njulia> mr = StepMRange(1, 2, 20)\nStepMRange(1:2:19)\n\njulia> fr = StepRange(1, 2, 20)\n1:2:19\n\njulia> is_dynamic(sr)\nfalse\n\njulia> is_dynamic(fr)\nfalse\n\njulia> is_dynamic(mr)\ntrue\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.is_static","page":"Traits","title":"StaticRanges.is_static","text":"is_static(x) -> Bool\n\nReturns true if x is static.\n\nExamples\n\njulia> using StaticRanges\n\njulia> sr = UnitSRange(1, 10)\nUnitSRange(1:10)\n\njulia> mr = StepMRange(1, 2, 20)\nStepMRange(1:2:19)\n\njulia> fr = StepRange(1, 2, 20)\n1:2:19\n\njulia> is_static(sr)\ntrue\n\njulia> is_static(mr)\nfalse\n\njulia> is_static(fr)\nfalse\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.is_fixed","page":"Traits","title":"StaticRanges.is_fixed","text":"is_fixed(x) -> Bool\n\nReturns true if the size of x is fixed.\n\nExamples\n\njulia> using StaticRanges\n\njulia> sr = UnitSRange(1, 10)\nUnitSRange(1:10)\n\njulia> mr = StepMRange(1, 2, 20)\nStepMRange(1:2:19)\n\njulia> fr = StepRange(1, 2, 20)\n1:2:19\n\njulia> is_fixed(sr)\nfalse\n\njulia> is_fixed(fr)\ntrue\n\njulia> is_fixed(mr)\nfalse\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.as_dynamic","page":"Traits","title":"StaticRanges.as_dynamic","text":"as_dynamic(x)\n\nIf x is mutable then returns x, otherwise returns a comparable but mutable type to x.\n\nExamples\n\njulia> using StaticRanges\n\njulia> as_dynamic(Base.OneTo(10))\nOneToMRange(10)\n\njulia> as_dynamic(UnitRange(1, 10))\nUnitMRange(1:10)\n\njulia> as_dynamic(StepRange(1, 2, 20))\nStepMRange(1:2:19)\n\njulia> as_dynamic(range(1.0, step=2.0, stop=20.0))\nStepMRangeLen(1.0:2.0:19.0)\n\njulia> as_dynamic(LinRange(1, 20, 10))\nLinMRange(1.0, stop=20.0, length=10)\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.as_static","page":"Traits","title":"StaticRanges.as_static","text":"as_static(x)\n\nIf x is static then returns x, otherwise returns a comparable but static size type to x.\n\nExamples\n\njulia> using StaticRanges\n\njulia> as_static(Base.OneTo(10))\nOneToSRange(10)\n\njulia> as_static(UnitRange(1, 10))\nUnitSRange(1:10)\n\njulia> as_static(StepRange(1, 2, 20))\nStepSRange(1:2:19)\n\njulia> as_static(range(1.0, step=2.0, stop=20.0))\nStepSRangeLen(1.0:2.0:19.0)\n\njulia> as_static(LinRange(1, 20, 10))\nLinSRange(1.0, stop=20.0, length=10)\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.as_fixed","page":"Traits","title":"StaticRanges.as_fixed","text":"as_fixed(x)\n\nIf x is immutable then returns x, otherwise returns a comparable but fixed size type to x.\n\nExamples\n\njulia> using StaticRanges\n\njulia> as_fixed(OneToMRange(10))\nBase.OneTo(10)\n\njulia> as_fixed(UnitMRange(1, 10))\n1:10\n\njulia> as_fixed(StepMRange(1, 2, 20))\n1:2:19\n\njulia> as_fixed(mrange(1.0, step=2.0, stop=20.0))\n1.0:2.0:19.0\n\njulia> as_fixed(LinMRange(1, 20, 10))\n10-element LinRange{Float64}:\n 1.0,3.11111,5.22222,7.33333,9.44444,11.5556,13.6667,15.7778,17.8889,20.0\n\n\n\n\n\n","category":"function"},{"location":"traits/#Order-traits-1","page":"Traits","title":"Order traits","text":"","category":"section"},{"location":"traits/#","page":"Traits","title":"Traits","text":"The following traits are used to conveniently characterize the order of ranges.","category":"page"},{"location":"traits/#","page":"Traits","title":"Traits","text":"StaticRanges.is_forward\nStaticRanges.is_reverse\nStaticRanges.order\nStaticRanges.is_ordered\nStaticRanges.is_before\nStaticRanges.is_after\nStaticRanges.is_contiguous","category":"page"},{"location":"traits/#StaticRanges.is_forward","page":"Traits","title":"StaticRanges.is_forward","text":"is_forward(x) -> Bool\n\nReturns true if x is sorted forward.\n\nExamples\n\njulia> using StaticRanges\n\njulia> fr = 1:2:10\n1:2:9\n\njulia> rr = 10:-2:1\n10:-2:2\n\njulia> is_forward(fr)\ntrue\n\njulia> is_forward(rr)\nfalse\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.is_reverse","page":"Traits","title":"StaticRanges.is_reverse","text":"is_reverse(x) -> Bool\n\nReturns true if x is sorted in reverse.\n\nExamples\n\njulia> using StaticRanges\n\njulia> fr = 1:2:10\n1:2:9\n\njulia> rr = 10:-2:1\n10:-2:2\n\njulia> is_reverse(fr)\nfalse\n\njulia> is_reverse(rr)\ntrue\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.order","page":"Traits","title":"StaticRanges.order","text":"order(x) -> Ordering\n\nReturns the ordering of x.\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.is_ordered","page":"Traits","title":"StaticRanges.is_ordered","text":"is_ordered(x) -> Bool\n\nReturns true if x is ordered. is_ordered should return the same value that issorted would on x except it doesn't specify how it's sorted (e.g., forward, reverse, etc).\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.is_before","page":"Traits","title":"StaticRanges.is_before","text":"is_before(x::T, y::T, collection::AbstractVector{T}) -> Bool\n\nReturns true if x is before y in collection.\n\n\n\n\n\nis_before(x::AbstractVector{T}, y::AbstractVector{T}) -> is_before(order(x), order(y), x, y)\nis_before(::Ordering, ::Ordering, x, y) -> Bool\n\nReturns true if all elements in x are before all elements in y. Functionally equivalent to all(x .< y).\n\nExamples\n\njulia> using StaticRanges\n\njulia> r1 = 1:5\n1:5\n\njulia> r2 = 6:10\n6:10\n\njulia> is_before(r2, r1)\nfalse\n\njulia> is_before(r1, r2)\ntrue\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.is_after","page":"Traits","title":"StaticRanges.is_after","text":"is_after(x::T, y::T, collection::AbstractVector{T}) -> Bool\n\nReturns true if x is after y in collection.\n\n\n\n\n\nis_after(x::AbstractVector{T}, y::AbstractVector{T}) -> is_after(order(x), order(y), x, y)\nis_after(::Ordering, ::Ordering, x, y) -> Bool\n\nReturns true if all elements in x are after all elements in y. Functionally equivalent to all(x .> y).\n\nExamples\n\njulia> using StaticRanges\n\njulia> r1 = 1:5\n1:5\n\njulia> r2 = 6:10\n6:10\n\njulia> is_after(r2, r1)\ntrue\n\njulia> is_after(r1, r2)\nfalse\n\n\n\n\n\n","category":"function"},{"location":"traits/#StaticRanges.is_contiguous","page":"Traits","title":"StaticRanges.is_contiguous","text":"is_contiguous(x, y) = is_contiguous(order(x), order(y), x, y)\nis_contiguous(::Ordering, ::Ordering, x, y) -> Bool\n\nReturns true if one of the ends of x may be extended by a single overlapping end of y.\n\nExample\n\njulia> using StaticRanges\n\njulia> is_contiguous(1:3, 3:4) == true\n\njulia> is_contiguous(3:-1:1, 3:4) == true\n\njulia> is_contiguous(3:-1:1, 4:-1:3) == true\n\njulia> is_contiguous(1:3, 4:-1:3) == true\n\njulia> is_contiguous(1:3, 2:4) == false\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#Manipulating-Ranges-1","page":"Manipulating Ranges","title":"Manipulating Ranges","text":"","category":"section"},{"location":"manipulating_ranges/#","page":"Manipulating Ranges","title":"Manipulating Ranges","text":"There are options for in place mutations and corresponding non mutating operations. These allow safe mutation of ranges by avoiding states that are typically prohibited at time of construction. For example, OneToMRange cannot have a negative value for it's stop field. These methods are also called whenever setproperty! is used.","category":"page"},{"location":"manipulating_ranges/#","page":"Manipulating Ranges","title":"Manipulating Ranges","text":"StaticRanges.can_set_first\nStaticRanges.set_first!\nStaticRanges.set_first","category":"page"},{"location":"manipulating_ranges/#StaticRanges.can_set_first","page":"Manipulating Ranges","title":"StaticRanges.can_set_first","text":"can_set_first(x) -> Bool\n\nReturns true if the first element of x can be set. If x is a range then changing the first element will also change the length of x.\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_first!","page":"Manipulating Ranges","title":"StaticRanges.set_first!","text":"set_first!(x, val)\n\nSet the first element of x to val.\n\nExamples\n\njulia> using StaticRanges\n\njulia> mr = UnitMRange(1, 10);\n\njulia> set_first!(mr, 2);\n\njulia> first(mr)\n2\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_first","page":"Manipulating Ranges","title":"StaticRanges.set_first","text":"set_first(x, val)\n\nReturns similar type as x with first value set to val.\n\nExamples\n\njulia> using StaticRanges\n\njulia> r = set_first(1:10, 2)\n2:10\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#","page":"Manipulating Ranges","title":"Manipulating Ranges","text":"StaticRanges.can_set_step\nStaticRanges.set_step!\nStaticRanges.set_step","category":"page"},{"location":"manipulating_ranges/#StaticRanges.can_set_step","page":"Manipulating Ranges","title":"StaticRanges.can_set_step","text":"can_set_step(x) -> Bool\n\nReturns true if type of x has step field that can be set.\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_step!","page":"Manipulating Ranges","title":"StaticRanges.set_step!","text":"set_step!(x, st)\n\nSets the step of x to val.\n\nExamples\n\njulia> using StaticRanges\n\njulia> mr = StepMRange(1, 1, 10);\n\njulia> set_step!(mr, 2);\n\njulia> step(mr)\n2\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_step","page":"Manipulating Ranges","title":"StaticRanges.set_step","text":"set_step(x, st)\n\nSets the step of x to val.\n\nExamples\n\njulia> using StaticRanges\n\njulia> set_step(1:1:10, 2)\n1:2:9\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#","page":"Manipulating Ranges","title":"Manipulating Ranges","text":"StaticRanges.can_set_last\nStaticRanges.set_last!\nStaticRanges.set_last","category":"page"},{"location":"manipulating_ranges/#StaticRanges.can_set_last","page":"Manipulating Ranges","title":"StaticRanges.can_set_last","text":"can_set_last(x) -> Bool\n\nReturns true if the last element of x can be set. If x is a range then changing the first element will also change the length of x.\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_last!","page":"Manipulating Ranges","title":"StaticRanges.set_last!","text":"set_last!(x, val)\n\nSet the last element of x to val.\n\nExamples\n\njulia> using StaticRanges\n\njulia> mr = UnitMRange(1, 10);\n\njulia> set_last!(r, 5);\n\njulia> last(mr)\n5\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_last","page":"Manipulating Ranges","title":"StaticRanges.set_last","text":"set_last(x, val)\n\nReturns a similar type as x with its last value equal to val.\n\nExamplse\n\njulia> using StaticRanges\n\njulia> set_last(1:10, 5)\n1:5\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#","page":"Manipulating Ranges","title":"Manipulating Ranges","text":"StaticRanges.can_set_length\nStaticRanges.set_length!\nStaticRanges.set_length","category":"page"},{"location":"manipulating_ranges/#StaticRanges.can_set_length","page":"Manipulating Ranges","title":"StaticRanges.can_set_length","text":"can_set_length(x) -> Bool\n\nReturns true if type of x can have its length set independent of changing its first or last position.\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_length!","page":"Manipulating Ranges","title":"StaticRanges.set_length!","text":"set_length!(x, len)\n\nReturns a similar type as x with a length equal to len.\n\nExamples\n\njulia> using StaticRanges\n\njulia> mr = UnitMRange(1, 10);\n\njulia> set_length!(mr, 20);\n\njulia> length(mr)\n20\n\n\n\n\n\n","category":"function"},{"location":"manipulating_ranges/#StaticRanges.set_length","page":"Manipulating Ranges","title":"StaticRanges.set_length","text":"set_length(x, len)\n\nChange the length of x while maintaining it's first and last positions.\n\nExamples\n\njulia> using StaticRanges\n\njulia> set_length(1:10, 20)\n1:20\n\n\n\n\n\n","category":"function"},{"location":"find/#\"Find\"-Functions-1","page":"\"Find\" Functions","title":"\"Find\" Functions","text":"","category":"section"},{"location":"find/#","page":"\"Find\" Functions","title":"\"Find\" Functions","text":"These are further used to make quick simple comparisons between objects.","category":"page"},{"location":"find/#","page":"\"Find\" Functions","title":"\"Find\" Functions","text":"There are some small improvements to the family of \"find and filter\" methods available in base Julia. In Order to avoid type piracy but generalize the benefits to all types of ranges, some minor syntactic differences are used here.","category":"page"},{"location":"find/#","page":"\"Find\" Functions","title":"\"Find\" Functions","text":"Starting with findall, there's a difference in the type that is returned.","category":"page"},{"location":"find/#","page":"\"Find\" Functions","title":"\"Find\" Functions","text":"julia> mr = StepMRange(1, 2, 19)\nStepMRange(1:2:19)\n\njulia> @btime findall(<(5), $fr)\n  142.072 ns (3 allocations: 208 bytes)\n2-element Array{Int64,1}:\n 1\n 2\n\njulia> @btime find_all(<(5), $fr)\n  0.027 ns (0 allocations: 0 bytes)\n1:2","category":"page"},{"location":"find/#","page":"\"Find\" Functions","title":"\"Find\" Functions","text":"julia> r = 1:10\n1:10\n\njulia> mr = UnitMRange(1, 10)\nUnitMRange(1:10)\n\njulia> findall(or(<(4), >(12)), mr)\n7-element Array{Int64,1}:\n  1\n  2\n  3\n  7\n  8\n  9\n 10\n\njulia> find_all(or(<(4), >(6)), r)\n7-element GapRange{Int64,UnitRange{Int64},UnitRange{Int64}}:\n  1\n  2\n  3\n  7\n  8\n  9\n 10\n\njulia> @btime filter(or(<(4), >(6)), $r)\n  124.496 ns (3 allocations: 320 bytes)\n7-element Array{Int64,1}:\n  1\n  2\n  3\n  7\n  8\n  9\n 10\n\njulia> @btime filter(or(<(4), >(6)), $mr)\n  72.911 ns (3 allocations: 208 bytes)\n7-element Array{Int64,1}:\n  1\n  2\n  3\n  7\n  8\n  9\n 10\n","category":"page"},{"location":"#Introduction-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"StaticRanges was originally a small set of functions inspired by StaticArrays. It eventually evolved into a project the aimed to improve the performance and flexibility of range related methods. It's objectives are:","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"Easy/intuitive composition of mutable and static ranges.\nOptimized methods involving ranges:\n\"find\" methods are currently the focus and optimizations currently exist for findall, findfirst, findlast, filter, and count using the <, <=, >, >=, ==, and != operators.\nIndexing related to AbstractAxis related methods.","category":"page"},{"location":"range_types/#Range-Types-1","page":"Range Types","title":"Range Types","text":"","category":"section"},{"location":"range_types/#","page":"Range Types","title":"Range Types","text":"There are static and mutable versions of most ranges present in the Base module of Julia. The basic terminology used herein is as follows:","category":"page"},{"location":"range_types/#","page":"Range Types","title":"Range Types","text":"Static: fully parameterized through parametric typing (similar to how Val is used)\nFixed: all parameters are immutable fields of a struct. This is how all ranges in Base are composed. \nDynamic: all parameters are mutable fields of a struct. This is how a handful of ranges in this package are composed.","category":"page"},{"location":"range_types/#","page":"Range Types","title":"Range Types","text":"The vast majority of the time a fixed range is the appropriate choice. There are some situations (perhaps few) where alternatives may be extremely convenient. For example, a static range may be helpful when the exact same parameters are frequently being accessed and don't need to change (e.g., a component of a filter in a processing pipeline). Mutable ranges may be helpful when referring to a range that is accessed rarely but may change (e.g., descriptive parameters of a plot's axis). However, this package is intentionally built without many assumptions of how it should be used. For example, safe methods for mutating ranges without violating the same assumptions of their original construction are provided but access to their fields are not obfuscated beyond overloading the setproperty! method","category":"page"},{"location":"range_types/#Static-Ranges-1","page":"Range Types","title":"Static Ranges","text":"","category":"section"},{"location":"range_types/#","page":"Range Types","title":"Range Types","text":"StaticRanges.OneToSRange\nStaticRanges.UnitSRange\nStaticRanges.LinSRange\nStaticRanges.StepSRange\nStaticRanges.StepSRangeLen","category":"page"},{"location":"range_types/#StaticRanges.OneToSRange","page":"Range Types","title":"StaticRanges.OneToSRange","text":"OneToSRange\n\nA static range that parallels OneTo in behavior.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.UnitSRange","page":"Range Types","title":"StaticRanges.UnitSRange","text":"UnitSRange\n\nA static range parameterized by a start and stop of type T, filled with elements spaced by 1 from start until stop is exceeded. The syntax a:b with a and b both Integers creates a UnitRange.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.LinSRange","page":"Range Types","title":"StaticRanges.LinSRange","text":"LinSRange\n\nA static range with len linearly spaced elements between its start and stop. The size of the spacing is controlled by len, which must be an Int.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.StepSRange","page":"Range Types","title":"StaticRanges.StepSRange","text":"StepSRange\n\nA static range with elements of type T with spacing of type S. The step between each element is constant, and the range is defined in terms of a start and stop of type T and a step of type S. Neither T nor S should be floating point types.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.StepSRangeLen","page":"Range Types","title":"StaticRanges.StepSRangeLen","text":"StepSRangeLen\n\nA static range r where r[i] produces values of type T (in the second form, T is deduced automatically), parameterized by a reference value, a step, and the length. By default ref is the starting value r[1], but alternatively you can supply it as the value of r[offset] for some other index 1 <= offset <= len. In conjunction with TwicePrecision this can be used to implement ranges that are free of roundoff error.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#Mutable-Ranges-1","page":"Range Types","title":"Mutable Ranges","text":"","category":"section"},{"location":"range_types/#","page":"Range Types","title":"Range Types","text":"StaticRanges.OneToMRange\nStaticRanges.UnitMRange\nStaticRanges.LinMRange\nStaticRanges.StepMRange\nStaticRanges.StepMRangeLen","category":"page"},{"location":"range_types/#StaticRanges.OneToMRange","page":"Range Types","title":"StaticRanges.OneToMRange","text":"OneToMRange\n\nA mutable range that parallels OneTo in behavior.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.UnitMRange","page":"Range Types","title":"StaticRanges.UnitMRange","text":"UnitMRange\n\nA mutable range parameterized by a start and stop of type T, filled with elements spaced by 1 from start until stop is exceeded. The syntax a:b with a and b both Integers creates a UnitRange.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.LinMRange","page":"Range Types","title":"StaticRanges.LinMRange","text":"LinMRange\n\nA mutable range with len linearly spaced elements between its start and stop. The size of the spacing is controlled by len, which must be an Int.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.StepMRange","page":"Range Types","title":"StaticRanges.StepMRange","text":"StepMRange\n\nA mutable range with elements of type T with spacing of type S. The step between each element is constant, and the range is defined in terms of a start and stop of type T and a step of type S. Neither T nor S should be floating point types.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.StepMRangeLen","page":"Range Types","title":"StaticRanges.StepMRangeLen","text":"StepMRangeLen\n\nA mutable range r where r[i] produces values of type T (in the second form, T is deduced automatically), parameterized by a reference value, a step, and the length. By default ref is the starting value r[1], but alternatively you can supply it as the value of r[offset] for some other index 1 <= offset <= len. In conjunction with TwicePrecision this can be used to implement ranges that are free of roundoff error.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#Abstract-Ranges-1","page":"Range Types","title":"Abstract Ranges","text":"","category":"section"},{"location":"range_types/#","page":"Range Types","title":"Range Types","text":"StaticRanges.OneToRange\nStaticRanges.AbstractLinRange\nStaticRanges.AbstractStepRangeLen\nStaticRanges.AbstractStepRange","category":"page"},{"location":"range_types/#StaticRanges.OneToRange","page":"Range Types","title":"StaticRanges.OneToRange","text":"OneToRange\n\nSupertype for OneToSRange and OneToMRange. It's subtypes should behave identically to Base.OneTo.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.AbstractLinRange","page":"Range Types","title":"StaticRanges.AbstractLinRange","text":"AbstractLinRange\n\nSupertype for mutable or static ranges with len linearly spaced elements between its start and stop.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.AbstractStepRangeLen","page":"Range Types","title":"StaticRanges.AbstractStepRangeLen","text":"AbstractStepRangeLen\n\nSupertype for StepSRangeLen and StepMRangeLen. It's subtypes should behave identically to StepRangeLen.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#StaticRanges.AbstractStepRange","page":"Range Types","title":"StaticRanges.AbstractStepRange","text":"AbstractStepRange\n\nSupertype for StepSRange and StepMRange. It's subtypes should behave identically to StepRange.\n\n\n\n\n\n","category":"type"},{"location":"range_types/#Special-Ranges-1","page":"Range Types","title":"Special Ranges","text":"","category":"section"},{"location":"range_types/#","page":"Range Types","title":"Range Types","text":"StaticRanges.GapRange","category":"page"},{"location":"range_types/#StaticRanges.GapRange","page":"Range Types","title":"StaticRanges.GapRange","text":"GapRange{T,F,L}\n\nRepresents a range that is broken up by gaps making it noncontinuous. This allows more compact storage of numbers where the majority are known to be continuous.\n\nExamples\n\njulia> using StaticRanges\n\njulia> findall(and(>(4), <(10)), 1:10)\n5-element Array{Int64,1}:\n 5\n 6\n 7\n 8\n 9\n\njulia> find_all(or(<(4), >(6)), 1:10)\n7-element GapRange{Int64,UnitRange{Int64},UnitRange{Int64}}:\n  1\n  2\n  3\n  7\n  8\n  9\n 10\n\n\n\n\n\n","category":"type"},{"location":"twice_precision/#Twice-Precision-1","page":"Twice Precision","title":"Twice Precision","text":"","category":"section"},{"location":"twice_precision/#","page":"Twice Precision","title":"Twice Precision","text":"A number of operations on ranges depend on the internal type Base.TwicePrecision. This requires some unique handling for static ranges. This package has a limited number of methods that exist for consistency with base and easier readability when manipulating twice precision values internally. It's unlikely users should ever need to use these methods (or even know about them) but there's some minimal documentation included in case one should ever be so unfortunate to need to become aware of their existence.","category":"page"},{"location":"twice_precision/#","page":"Twice Precision","title":"Twice Precision","text":"StaticRanges.gethi\nStaticRanges.getlo\nStaticRanges.stephi\nStaticRanges.steplo\nStaticRanges.refhi\nStaticRanges.reflo\nStaticRanges.set_ref!\nStaticRanges.set_offset!","category":"page"},{"location":"twice_precision/#StaticRanges.gethi","page":"Twice Precision","title":"StaticRanges.gethi","text":"gethi(x::Union{TPVal{T}, TwicePrecision{T}}) -> T\n\nReturns the hi component of a twice precision number. Works for both statically set TPVal and TwicePrecision.\n\n\n\n\n\n","category":"function"},{"location":"twice_precision/#StaticRanges.getlo","page":"Twice Precision","title":"StaticRanges.getlo","text":"getlo(x::Union{TPVal{T}, TwicePrecision{T}}) -> T\n\nReturns the lo component of a twice precision number. Works for both statically set TPVal and TwicePrecision.\n\n\n\n\n\n","category":"function"},{"location":"twice_precision/#StaticRanges.stephi","page":"Twice Precision","title":"StaticRanges.stephi","text":"stephi(x::AbstractStepRangeLen) - Returns the hi component of a twice precision step\n\n\n\n\n\n","category":"function"},{"location":"twice_precision/#StaticRanges.steplo","page":"Twice Precision","title":"StaticRanges.steplo","text":"steplo(x::AbstractStepRangeLen) - Returns the lo component of a twice precision step\n\n\n\n\n\n","category":"function"},{"location":"twice_precision/#StaticRanges.refhi","page":"Twice Precision","title":"StaticRanges.refhi","text":"refhi(x::AbstractStepRangeLen) - Returns the hi component of a twice precision ref\n\n\n\n\n\n","category":"function"},{"location":"twice_precision/#StaticRanges.reflo","page":"Twice Precision","title":"StaticRanges.reflo","text":"reflo(x::AbstractStepRangeLen) - Returns the lo component of a twice precision ref\n\n\n\n\n\n","category":"function"},{"location":"twice_precision/#StaticRanges.set_ref!","page":"Twice Precision","title":"StaticRanges.set_ref!","text":"set_ref!(x, val)\n\nSet the reference field of an instance of StepMRangeLen.\n\n\n\n\n\n","category":"function"},{"location":"twice_precision/#StaticRanges.set_offset!","page":"Twice Precision","title":"StaticRanges.set_offset!","text":"set_offset!(x, val)\n\nSet the offset field of an instance of StepMRangeLen.\n\n\n\n\n\n","category":"function"}]
}
