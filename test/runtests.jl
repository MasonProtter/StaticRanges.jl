using Test, StaticRanges

@testset "ranges" begin
    for frange in (mrange, srange)
    #=
    @testset "colon" begin
        @inferred(mrange(10, step=1, stop=0))
        @inferred(mrange(1, step=.2, stop=2))
        @inferred(mrange(1., step=.2, stop=2.))
        @inferred(mrange(2, step=-.2, stop=1))
        @inferred(mrange(1, 0))
        @inferred(mrange(0.0, -0.5))
    end
    =#
intersect(reverse(typemin(Int):2:typemax(Int)), frange(typemin(Int), step=2, stop=typemax(Int)))

reverse(typemin(Int):2:typemax(Int))
        @testset "indexing" begin
            L32 = frange(Int32(1), stop=Int32(4), length=4)
            L64 = frange(Int64(1), stop=Int64(4), length=4)
            @test @inferred(L32[1]) === 1.0 && @inferred(L64[1]) === 1.0
            @test L32[2] == 2 && L64[2] == 2
            @test L32[3] == 3 && L64[3] == 3
            @test L32[4] == 4 && L64[4] == 4
            @test frange(1.0, stop=2.0, length=2)[1] === 1.0
            @test frange(1.0f0, stop=2.0f0, length=2)[1] === 1.0f0
            @test frange(Float16(1.0), stop=Float16(2.0), length=2)[1] === Float16(1.0)

            let r = frange(5, step=-1, stop=1)
                @test r[1]==5
                @test r[2]==4
                @test r[3]==3
                @test r[4]==2
                @test r[5]==1
            end
            @test @inferred(frange(0.1, step=0.1, stop=0.3)[2]) === 0.2
            @test @inferred(frange(0.1f0, step=0.1f0, stop=0.3f0)[2]) === 0.2f0

            @test frange(1, 5)[1:4] == 1:4
            @test frange(1.0, 5)[1:4] == 1.0:4
            @test frange(2, 6)[1:4] == 2:5
            @test frange(1, 6)[2:5] == 2:5
            @test frange(1, 6)[2:2:5] == 2:2:4
            @test frange(1, step=2, stop=13)[2:6] == 3:2:11
            @test frange(1, step=2, stop=13)[2:3:7] == 3:6:13

            @test isempty(frange(1, 4)[5:4])
            @test_throws BoundsError frange(1:10)[8:-1:-2]
        end
        @testset "length" begin
            @test length(frange(.1, step=.1, stop=.3)) == 3
            @test length(frange(1.1, step=1.1, stop=3.3)) == 3
            @test length(frange(1.1, step=1.3, stop=3)) == 2
            @test length(frange(1, step=1, stop=1.8)) == 1
            @test length(frange(1, step=.2, stop=2)) == 6
            @test length(frange(1., step=.2, stop=2.)) == 6
            @test length(frange(2, step=-.2, stop=1)) == 6
            @test length(frange(2., step=-.2, stop=1.)) == 6
            @test length(frange(2, step=.2, stop=1)) == 0
            @test length(frange(2., step=.2, stop=1.)) == 0

            @test length(frange(1, 0)) == 0
            @test length(frange(0.0, -0.5)) == 0
            @test length(frange(1, step=2, stop=0)) == 0
            @test length(frange(Char(0), Char(0x001fffff))) == 2097152
            @test length(frange(typemax(UInt64)//one(UInt64), step=1, stop=typemax(UInt64)//one(UInt64))) == 1
        end
        @testset "keys/values" begin
            keytype_is_correct(r) = keytype(r) == eltype(keys(r))
            valtype_is_correct(r) = valtype(r) == eltype(values(r))
            @test keytype_is_correct(frange(1, 3))
            @test keytype_is_correct(frange(1, step=.3, stop=4))
            @test keytype_is_correct(frange(.11, step=.1, stop=.3))
            @test keytype_is_correct(frange(Int8(1), Int8(5)))
            @test keytype_is_correct(frange(Int16(1), Int8(5)))
            @test keytype_is_correct(frange(Int16(1), step=Int8(3), stop=Int8(5)))
            @test keytype_is_correct(frange(Int8(1), step=Int16(3), stop=Int8(5)))
            @test keytype_is_correct(frange(Int8(1), step=Int8(3), stop=Int16(5)))
            @test keytype_is_correct(frange(Int64(1), Int64(5)))
            @test keytype_is_correct(frange(Int64(1), Int64(5)))
            @test keytype_is_correct(frange(Int128(1), Int128(5)))
#            @test keytype_is_correct(OneTo(4))
#            @test keytype_is_correct(Base.OneTo(Int32(4)))

            @test valtype_is_correct(1:3)
            @test valtype_is_correct(1:.3:4)
            @test valtype_is_correct(.1:.1:.3)
            @test valtype_is_correct(frange(Int8(1), Int8(5)))
            @test valtype_is_correct(frange(Int16(1), Int8(5)))
            @test valtype_is_correct(frange(Int16(1), step=Int8(3), stop=Int8(5)))
            @test valtype_is_correct(frange(Int8(1), step=Int16(3), stop=Int8(5)))
            @test valtype_is_correct(frange(Int8(1), step=Int8(3), stop=Int16(5)))
            @test valtype_is_correct(frange(Int64(1), Int64(5)))
            @test valtype_is_correct(frange(Int64(1), Int64(5)))
            @test valtype_is_correct(frange(Int128(1), Int128(5)))
#            @test valtype_is_correct(Base.OneTo(4))
#            @test valtype_is_correct(Base.OneTo(Int32(4)))
        end
        @testset "findall(::Base.Fix2{typeof(in)}, ::Array)" begin
            @test findall(in(3:20), [5.2, 3.3]) == findall(in(Vector(3:20)), [5.2, 3.3])

            let span = frange(5, 20),
                r = frange(-7, step=3, stop=42)
                @test findall(in(span), r) == 5:10
                r = frange(15, step=-2, stop=-38)
                @test findall(in(span), r) == 1:6
            end
        end
        @testset "findfirst" begin
            @test findfirst(isequal(7), frange(1, step=2, stop=10)) == 4
            @test findfirst(==(7), frange(1, step=2, stop=10)) == 4
            @test findfirst(==(10), frange(1, step=2, stop=10)) == nothing
            @test findfirst(==(11), frange(1, step=2, stop=10)) == nothing
        end
        @testset "reverse" begin
            @test reverse(reverse(1:10)) == 1:10
            @test reverse(reverse(typemin(Int):typemax(Int))) == typemin(Int):typemax(Int)
            @test reverse(reverse(typemin(Int):2:typemax(Int))) == typemin(Int):2:typemax(Int)
        end
        @testset "intersect" begin

            @test intersect(frange(1, 5), frange(2, 3)) == 2:3
            @test intersect(frange(-3, 5), frange(2, 8)) == 2:5
            @test intersect(frange(-8, -3), frange(-8, -3)) == -8:-3
            @test intersect(frange(1, 5), frange(5, 13)) == 5:5
            @test isempty(intersect(frange(-8, -3), frange(-2, 2)))

            @test isempty(intersect(frange(-3, 7), frange(2, 1)))
            @test intersect(frange(1, 11), frange(-2, step=3, stop=15)) == 1:3:10
            @test intersect(frange(1, 11), frange(-2, step=2, stop=15)) == 2:2:10
            @test intersect(frange(1, 11), frange(-2, step=1, stop=15)) == 1:11
            @test intersect(frange(1, 11), frange(15, step=-1, stop=-2)) == 1:11
            @test intersect(frange(1, 11), frange(15, step=-4, stop=-2)) == 3:4:11
            @test intersect(frange(-20, -5), frange(-10, step=3, stop=-2)) == -10:3:-7
            @test isempty(intersect(frange(-5, 5), frange(-6, step=13, stop=20)))
            @test isempty(intersect(frange(1, 11), frange(15, step=4, stop=-2)))
            @test isempty(intersect(frange(11, 1), frange(15, step=-4, stop=-2)))
            #@test intersect(-5:5, 1+0*(1:3)) == 1:1
            #@test isempty(intersect(-5:5, 6+0*(1:3)))
            @test intersect(frange(-15, step=4, stop=7), frange(-10, -2)) == -7:4:-3
            @test intersect(frange(13, step=-2, stop=1), frange(-2, 8)) == 7:-2:1
            @test isempty(intersect(frange(13, step=2, stop=1), frange(-2, 8)))
            @test isempty(intersect(frange(13, step=-2, stop=1), frange(8, -2)))
            #@test intersect(5+0*(1:4), 2:8) == 5+0*(1:4)
            #@test isempty(intersect(5+0*(1:4), -7:3))
            @test intersect(frange(0, step=3, stop=24), frange(0, step=4, stop=24)) == 0:12:24
            @test intersect(frange(0, step=4, stop=24), frange(0, step=3, stop=24)) == 0:12:24
            @test intersect(frange(0, step=3, stop=24), frange(24, step=-4, stop=0)) == 0:12:24
            @test intersect(frange(24, step=-3, stop=0), frange(0, step=4, stop=24)) == 24:-12:0
            @test intersect(frange(24, step=-3, stop=0), frange(24, step=-4, stop=0)) == 24:-12:0
            @test intersect(frange(1, step=3, stop=24), frange(0, step=4, stop=24)) == 4:12:16
            @test intersect(frange(0, step=6, stop=24), frange(0, step=4, stop=24)) == 0:12:24
            @test isempty(intersect(frange(1, step=6, stop=2400), frange(0, step=4, stop=2400)))
            @test intersect(frange(-51, step=5, stop=100), frange(-33, step=7, stop=125)) == -26:35:79
            @test intersect(frange(-51, step=5, stop=100), frange(-32, step=7, stop=125)) == -11:35:94
            #@test intersect(0:6:24, 6+0*(0:4:24)) == 6:6:6
            #@test intersect(12+0*(0:6:24), 0:4:24) == AbstractRange(12, 0, 5)
            #@test isempty(intersect(6+0*(0:6:24), 0:4:24))
            @test intersect(frange(-10, step=3, stop=24), frange(-10, step=3, stop=24)) == -10:3:23
            @test isempty(intersect(frange(-11, step=3, stop=24), frange(-10, step=3, stop=24)))
            @test intersect(frange(typemin(Int), step=2, stop=typemax(Int)), 1:10) == 2:2:10
            @test intersect(1:10, frange(typemin(Int), step=2, stop=typemax(Int))) == 2:2:10

            @test intersect(reverse(typemin(Int):2:typemax(Int)), frange(typemin(Int), step=2, stop=typemax(Int))) == reverse(typemin(Int):2:typemax(Int))
            @test intersect(typemin(Int):2:typemax(Int), reverse(frange(typemin(Int), step=2, stop=typemax(Int)))) == typemin(Int):2:typemax(Int)

            #=
            @test intersect(UnitRange(1,2),3) == UnitRange(3,2)
            @test intersect(UnitRange(1,2), UnitRange(1,5), UnitRange(3,7), UnitRange(4,6)) == UnitRange(4,3)

            @test intersect(1:3, 2) === intersect(2, 1:3) === 2:2
            @test intersect(1.0:3.0, 2) == intersect(2, 1.0:3.0) == [2.0]

            @testset "Support StepRange with a non-numeric step" begin
                start = Date(1914, 7, 28)
                stop = Date(1918, 11, 11)

                @test intersect(start:Day(1):stop, start:Day(1):stop) == start:Day(1):stop
                @test intersect(start:Day(1):stop, start:Day(5):stop) == start:Day(5):stop
                @test intersect(start-Day(10):Day(1):stop-Day(10), start:Day(5):stop) ==
                    start:Day(5):stop-Day(10)-mod(stop-start, Day(5))
        end
        =#
        end
    end
end
#=
    @testset "issubset" begin
        @test issubset(1:3, 1:typemax(Int)) #32461
        @test issubset(1:3, 1:3)
        @test issubset(1:3, 1:4)
        @test issubset(1:3, 0:3)
        @test issubset(1:3, 0:4)
        @test !issubset(1:5, 2:5)
        @test !issubset(1:5, 1:4)
        @test !issubset(1:5, 2:4)
        @test issubset(Base.OneTo(5), Base.OneTo(10))
        @test !issubset(Base.OneTo(10), Base.OneTo(5))
        @test issubset(1:3:10, 1:10)
        @test !issubset(1:10, 1:3:10)
    end
    @testset "sort/sort!/partialsort" begin
        @test sort(UnitRange(1,2)) == UnitRange(1,2)
        @test sort!(UnitRange(1,2)) == UnitRange(1,2)
        @test sort(1:10, rev=true) == 10:-1:1
        @test sort(-3:3, by=abs) == [0,-1,1,-2,2,-3,3]
        @test partialsort(1:10, 4) == 4
    end
    @testset "in" begin
        @test 0 in UInt(0):100:typemax(UInt)
        @test last(UInt(0):100:typemax(UInt)) in UInt(0):100:typemax(UInt)
        @test -9223372036854775790 in -9223372036854775790:100:9223372036854775710
        @test -9223372036854775690 in -9223372036854775790:100:9223372036854775710
        @test -90 in -9223372036854775790:100:9223372036854775710
        @test 10 in -9223372036854775790:100:9223372036854775710
        @test 110 in -9223372036854775790:100:9223372036854775710
        @test 9223372036854775610 in -9223372036854775790:100:9223372036854775710
        @test 9223372036854775710 in -9223372036854775790:100:9223372036854775710


        @test !(3.5 in 1:5)
        @test (3 in 1:5)
        @test (3 in 5:-1:1)
        #@test (3 in 3+0*(1:5))
        #@test !(4 in 3+0*(1:5))

        let r = 0.0:0.01:1.0
            @test (r[30] in r)
        end
        let r = (-4*Int64(maxintfloat(Int === Int32 ? Float32 : Float64))):5
            @test (3 in r)
            @test (3.0 in r)
        end

        @test !(1 in 1:0)
        @test !(1.0 in 1.0:0.0)
    end
    @testset "in() works across types, including non-numeric types (#21728)" begin
        @test 1//1 in 1:3
        @test 1//1 in 1.0:3.0
        @test !(5//1 in 1:3)
        @test !(5//1 in 1.0:3.0)
        @test Complex(1, 0) in 1:3
        @test Complex(1, 0) in 1.0:3.0
        @test Complex(1.0, 0.0) in 1:3
        @test Complex(1.0, 0.0) in 1.0:3.0
        @test !(Complex(1, 1) in 1:3)
        @test !(Complex(1, 1) in 1.0:3.0)
        @test !(Complex(1.0, 1.0) in 1:3)
        @test !(Complex(1.0, 1.0) in 1.0:3.0)
        @test !(π in 1:3)
        @test !(π in 1.0:3.0)
        @test !("a" in 1:3)
        @test !("a" in 1.0:3.0)
        @test !(1 in Date(2017, 01, 01):Dates.Day(1):Date(2017, 01, 05))
        @test !(Complex(1, 0) in Date(2017, 01, 01):Dates.Day(1):Date(2017, 01, 05))
        @test !(π in Date(2017, 01, 01):Dates.Day(1):Date(2017, 01, 05))
        @test !("a" in Date(2017, 01, 01):Dates.Day(1):Date(2017, 01, 05))
    end
end
# TODO
@testset "indexing range with empty range (#4309)" begin
    @test (3:6)[5:4] == 7:6
    @test_throws BoundsError (3:6)[5:5]
    @test_throws BoundsError (3:6)[5]
    @test (0:2:10)[7:6] == 12:2:10
    @test_throws BoundsError (0:2:10)[7:7]
end
# indexing with negative ranges (#8351)
for a=AbstractRange[3:6, 0:2:10], b=AbstractRange[0:1, 2:-1:0]
    @test_throws BoundsError a[b]
end

# avoiding intermediate overflow (#5065)
@test length(1:4:typemax(Int)) == div(typemax(Int),4) + 1

@testset "overflow in length" begin
    Tset = Int === Int64 ? (Int,UInt,Int128,UInt128) :
                           (Int,UInt,Int64,UInt64,Int128, UInt128)
    for T in Tset
        @test_throws OverflowError length(zero(T):typemax(T))
        @test_throws OverflowError length(typemin(T):typemax(T))
        @test_throws OverflowError length(zero(T):one(T):typemax(T))
        @test_throws OverflowError length(typemin(T):one(T):typemax(T))
        if T <: Signed
            @test_throws OverflowError length(-one(T):typemax(T)-one(T))
            @test_throws OverflowError length(-one(T):one(T):typemax(T)-one(T))
        end
    end
end
@testset "loops involving typemin/typemax" begin
    n = 0
    s = 0
    # loops ending at typemax(Int)
    for i = (typemax(Int)-1):typemax(Int)
        s += 1
        @test s <= 2
    end
    @test s == 2

    s = 0
    for i = (typemax(Int)-2):(typemax(Int)-1)
        s += 1
        @test s <= 2
    end
    @test s == 2

    s = 0
    for i = typemin(Int):(typemin(Int)+1)
        s += 1
        @test s <= 2
    end
    @test s == 2

    # loops covering the full range of integers
    s = 0
    for i = typemin(UInt8):typemax(UInt8)
        s += 1
    end
    @test s == 256

    s = 0
    for i = typemin(UInt):typemax(UInt)
        i == 10 && break
        s += 1
    end
    @test s == 10

    s = 0
    for i = typemin(UInt8):one(UInt8):typemax(UInt8)
        s += 1
    end
    @test s == 256

    s = 0
    for i = typemin(UInt):1:typemax(UInt)
        i == 10 && break
        s += 1
    end
    @test s == 10

    # loops past typemax(Int)
    n = 0
    s = Int128(0)
    for i = typemax(UInt64)-2:typemax(UInt64)
        n += 1
        s += i
    end
    @test n == 3
    @test s == 3*Int128(typemax(UInt64)) - 3

    # loops over empty ranges
    s = 0
    for i = 0xff:0x00
        s += 1
    end
    @test s == 0

    s = 0
    for i = Int128(typemax(Int128)):Int128(typemin(Int128))
        s += 1
    end
    @test s == 0
end

@testset "sums of ranges" begin
    @test sum(1:100) == 5050
    @test sum(0:100) == 5050
    @test sum(-100:100) == 0
    @test sum(0:2:100) == 2550
end
@testset "overflowing sums (see #5798)" begin
    if Sys.WORD_SIZE == 64
        @test sum(Int128(1):10^18) == div(10^18 * (Int128(10^18)+1), 2)
        @test sum(Int128(1):10^18-1) == div(10^18 * (Int128(10^18)-1), 2)
    else
        @test sum(Int64(1):10^9) == div(10^9 * (Int64(10^9)+1), 2)
        @test sum(Int64(1):10^9-1) == div(10^9 * (Int64(10^9)-1), 2)
    end
end
@testset "Tricky sums of StepRangeLen #8272" begin
    @test sum(10000.:-0.0001:0) == 5.00000005e11
    @test sum(0:0.001:1) == 500.5
    @test sum(0:0.000001:1) == 500000.5
    @test sum(0:0.1:10) == 505.
end
@testset "broadcasted operations with scalars" begin
    @test broadcast(-, 1:3) === -1:-1:-3
    @test broadcast(-, 1:3, 2) === -1:1
    @test broadcast(-, 1:3, 0.25) === 1-0.25:3-0.25
    @test broadcast(+, 1:3) === 1:3
    @test broadcast(+, 1:3, 2) === 3:5
    @test broadcast(+, 1:3, 0.25) === 1+0.25:3+0.25
    @test broadcast(+, 1:2:6, 1) === 2:2:6
    @test broadcast(+, 1:2:6, 0.3) === 1+0.3:2:5+0.3
    @test broadcast(-, 1:2:6, 1) === 0:2:4
    @test broadcast(-, 1:2:6, 0.3) === 1-0.3:2:5-0.3
    @test broadcast(-, 2, 1:3) === 1:-1:-1
end
@testset "operations between ranges and arrays" begin
    @test all(([1:5;] + (5:-1:1)) .== 6)
    @test all(((5:-1:1) + [1:5;]) .== 6)
    @test all(([1:5;] - (1:5)) .== 0)
    @test all(((1:5) - [1:5;]) .== 0)
end
@testset "tricky floating-point ranges" begin
    for (start, step, stop, len) in ((1, 1, 3, 3), (0, 1, 3, 4),
                                    (3, -1, -1, 5), (1, -1, -3, 5),
                                    (0, 1, 10, 11), (0, 7, 21, 4),
                                    (0, 11, 33, 4), (1, 11, 34, 4),
                                    (0, 13, 39, 4), (1, 13, 40, 4),
                                    (11, 11, 33, 3), (3, 1, 11, 9),
                                    (0, 10, 55, 0), (0, -1, 5, 0), (0, 10, 5, 0),
                                    (0, 1, 5, 0), (0, -10, 5, 0), (0, -10, 0, 1),
                                    (0, -1, 1, 0), (0, 1, -1, 0), (0, -1, -10, 11))
        r = start/10:step/10:stop/10
        a = Vector(start:step:stop)./10
        ra = Vector(r)

        @test r == a
        @test isequal(r, a)

        @test r == ra
        @test isequal(r, ra)

        @test hash(r) == hash(a)
        @test hash(r) == hash(ra)

        if len > 0
            l = range(start/10, stop=stop/10, length=len)
            la = Vector(l)

            @test a == l
            @test r == l
            @test isequal(a, l)
            @test isequal(r, l)

            @test l == la
            @test isequal(l, la)

            @test hash(l) == hash(a)
            @test hash(l) == hash(la)
        end
    end

    @test 1.0:1/49:27.0 == range(1.0, stop=27.0, length=1275) == [49:1323;]./49
    @test isequal(1.0:1/49:27.0, range(1.0, stop=27.0, length=1275))
    @test isequal(1.0:1/49:27.0, Vector(49:1323)./49)
    @test hash(1.0:1/49:27.0) == hash(range(1.0, stop=27.0, length=1275)) == hash(Vector(49:1323)./49)

    @test [prevfloat(0.1):0.1:0.3;] == [prevfloat(0.1), 0.2, 0.3]
    @test [nextfloat(0.1):0.1:0.3;] == [nextfloat(0.1), 0.2]
    @test [prevfloat(0.0):0.1:0.3;] == [prevfloat(0.0), 0.1, 0.2]
    @test [nextfloat(0.0):0.1:0.3;] == [nextfloat(0.0), 0.1, 0.2]
    @test [0.1:0.1:prevfloat(0.3);] == [0.1, 0.2]
    @test [0.1:0.1:nextfloat(0.3);] == [0.1, 0.2, nextfloat(0.3)]
    @test [0.0:0.1:prevfloat(0.3);] == [0.0, 0.1, 0.2]
    @test [0.0:0.1:nextfloat(0.3);] == [0.0, 0.1, 0.2, nextfloat(0.3)]
    @test [0.1:prevfloat(0.1):0.3;] == [0.1, 0.2, 0.3]
    @test [0.1:nextfloat(0.1):0.3;] == [0.1, 0.2]
    @test [0.0:prevfloat(0.1):0.3;] == [0.0, prevfloat(0.1), prevfloat(0.2), 0.3]
    @test [0.0:nextfloat(0.1):0.3;] == [0.0, nextfloat(0.1), nextfloat(0.2)]
end

function loop_range_values(::Type{T}) where T
    for a = -5:25,
        s = [-5:-1; 1:25; ],
        d = 1:25,
        n = -1:15

        denom = convert(T, d)
        strt = convert(T, a)/denom
        Δ     = convert(T, s)/denom
        stop  = convert(T, (a + (n - 1) * s)) / denom
        vals  = T[a:s:(a + (n - 1) * s); ] ./ denom
        r = strt:Δ:stop
        @test [r;] == vals
        @test [range(strt, stop=stop, length=length(r));] == vals
        n = length(r)
        @test [r[1:n];] == [r;]
        @test [r[2:n];] == [r;][2:end]
        @test [r[1:3:n];] == [r;][1:3:n]
        @test [r[2:2:n];] == [r;][2:2:n]
        @test [r[n:-1:2];] == [r;][n:-1:2]
        @test [r[n:-2:1];] == [r;][n:-2:1]
    end
end

@testset "issue #7420 for type $T" for T = (Float32, Float64,) # BigFloat),
    loop_range_values(T)
end

@testset "issue #20373 (unliftable ranges with exact end points)" begin
    @test [3*0.05:0.05:0.2;]    == [range(3*0.05, stop=0.2, length=2);]   == [3*0.05,0.2]
    @test [0.2:-0.05:3*0.05;]   == [range(0.2, stop=3*0.05, length=2);]   == [0.2,3*0.05]
    @test [-3*0.05:-0.05:-0.2;] == [range(-3*0.05, stop=-0.2, length=2);] == [-3*0.05,-0.2]
    @test [-0.2:0.05:-3*0.05;]  == [range(-0.2, stop=-3*0.05, length=2);] == [-0.2,-3*0.05]
end

function range_fuzztests(::Type{T}, niter, nrange) where {T}
    for i = 1:niter, n in nrange
        strt, Δ = randn(T), randn(T)
        Δ == 0 && continue
        stop = strt + (n-1)*Δ
        # `n` is not necessarily unique s.t. `strt + (n-1)*Δ == stop`
        # so test that `length(strt:Δ:stop)` satisfies this identity
        # and is the closest value to `(stop-strt)/Δ` to do so
        lo = hi = n
        while strt + (lo-1)*Δ == stop; lo -= 1; end
        while strt + (hi-1)*Δ == stop; hi += 1; end
        m = clamp(round(Int, (stop-strt)/Δ) + 1, lo+1, hi-1)
        r = strt:Δ:stop
        @test m == length(r)
        @test strt == first(r)
        @test Δ == step(r)
        @test_skip stop == last(r)
        l = range(strt, stop=stop, length=n)
        @test n == length(l)
        @test strt == first(l)
        @test stop  == last(l)
    end
end
@testset "range fuzztests for $T" for T = (Float32, Float64,)
    range_fuzztests(T, 2^15, 1:5)
end

@testset "Inexact errors on 32 bit architectures. #22613" begin
    @test first(range(log(0.2), stop=log(10.0), length=10)) == log(0.2)
    @test last(range(log(0.2), stop=log(10.0), length=10)) == log(10.0)
    @test length(Base.floatrange(-3e9, 1.0, 1, 1.0)) == 1
end

@testset "ranges with very small endpoints for type $T" for T = (Float32, Float64)
    z = zero(T)
    u = eps(z)
    @test first(range(u, stop=u, length=0)) == u
    @test last(range(u, stop=u, length=0)) == u
    @test first(range(-u, stop=u, length=0)) == -u
    @test last(range(-u, stop=u, length=0)) == u
    @test [range(-u, stop=u, length=0);] == []
    @test [range(-u, stop=-u, length=1);] == [-u]
    @test [range(-u, stop=u, length=2);] == [-u,u]
    @test [range(-u, stop=u, length=3);] == [-u,0,u]
    @test first(range(-u, stop=-u, length=0)) == -u
    @test last(range(-u, stop=-u, length=0)) == -u
    @test first(range(u, stop=-u, length=0)) == u
    @test last(range(u, stop=-u, length=0)) == -u
    @test [range(u, stop=-u, length=0);] == []
    @test [range(u, stop=u, length=1);] == [u]
    @test [range(u, stop=-u, length=2);] == [u,-u]
    @test [range(u, stop=-u, length=3);] == [u,0,-u]
    v = range(-u, stop=u, length=12)
    @test length(v) == 12
    @test [-3u:u:3u;] == [range(-3u, stop=3u, length=7);] == [-3:3;].*u
    @test [3u:-u:-3u;] == [range(3u, stop=-3u, length=7);] == [3:-1:-3;].*u
end

@testset "range with very large endpoints for type $T" for T = (Float32, Float64)
    largeint = Int(min(maxintfloat(T), typemax(Int)))
    a = floatmax()
    for i = 1:5
        @test [range(a, stop=a, length=1);] == [a]
        @test [range(-a, stop=-a, length=1);] == [-a]
        b = floatmax()
        for j = 1:5
            @test [range(-a, stop=b, length=0);] == []
            @test [range(-a, stop=b, length=2);] == [-a,b]
            @test [range(-a, stop=b, length=3);] == [-a,(b-a)/2,b]
            @test [range(a, stop=-b, length=0);] == []
            @test [range(a, stop=-b, length=2);] == [a,-b]
            @test [range(a, stop=-b, length=3);] == [a,(a-b)/2,-b]
            for c = largeint-3:largeint
                s = range(-a, stop=b, length=c)
                @test first(s) == -a
                @test last(s) == b
                @test length(s) == c
                s = range(a, stop=-b, length=c)
                @test first(s) == a
                @test last(s) == -b
                @test length(s) == c
            end
            b = prevfloat(b)
        end
        a = prevfloat(a)
    end
end

# issue #20380
let r = LinRange(1,4,4)
    @test isa(r[1:4], LinRange)
end

@testset "range with 1 or 0 elements (whose step length is NaN)" begin
    @test issorted(range(1, stop=1, length=0))
    @test issorted(range(1, stop=1, length=1))
end
# near-equal ranges
@test 0.0:0.1:1.0 != 0.0f0:0.1f0:1.0f0

# comparing and hashing ranges
@testset "comparing and hashing ranges" begin
    Rs = AbstractRange[1:1, 1:1:1, 1:2, 1:1:2,
                       map(Int32,1:3:17), map(Int64,1:3:17), 1:0, 1:-1:0, 17:-3:0,
                       0.0:0.1:1.0, map(Float32,0.0:0.1:1.0),map(Float32,LinRange(0.0, 1.0, 11)),
                       1.0:eps():1.0 .+ 10eps(), 9007199254740990.:1.0:9007199254740994,
                       range(0, stop=1, length=20), map(Float32, range(0, stop=1, length=20))]
    for r in Rs
        local r
        ar = Vector(r)
        @test r == ar
        @test isequal(r,ar)
        @test hash(r) == hash(ar)
        for s in Rs
            as = Vector(s)
            @test isequal(r,s) == (hash(r)==hash(s))
            @test (r==s) == (ar==as)
        end
    end
end

@testset "comparing UnitRanges and OneTo" begin
    @test 1:2:10 == 1:2:10 != 1:3:10 != 1:3:13 != 2:3:13 == 2:3:11 != 2:11
    @test 1:1:10 == 1:10 == 1:10 == Base.OneTo(10) == Base.OneTo(10)
    @test 1:10 != 2:10 != 2:11 != Base.OneTo(11)
    @test Base.OneTo(10) != Base.OneTo(11) != 1:10
end
# issue #2959
@test 1.0:1.5 == 1.0:1.0:1.5 == 1.0:1.0
#@test 1.0:(.3-.1)/.1 == 1.0:2.0

@testset "length with typemin/typemax" begin
    let r = typemin(Int64):2:typemax(Int64), s = typemax(Int64):-2:typemin(Int64)
        @test first(r) == typemin(Int64)
        @test last(r) == (typemax(Int64)-1)
        @test_throws OverflowError length(r)

        @test first(s) == typemax(Int64)
        @test last(s) == (typemin(Int64)+1)
        @test_throws OverflowError length(s)
    end

    @test length(typemin(Int64):3:typemax(Int64)) == 6148914691236517206
    @test length(typemax(Int64):-3:typemin(Int64)) == 6148914691236517206

    for s in 3:100
        @test length(typemin(Int):s:typemax(Int)) == length(big(typemin(Int)):big(s):big(typemax(Int)))
        @test length(typemax(Int):-s:typemin(Int)) == length(big(typemax(Int)):big(-s):big(typemin(Int)))
    end

    @test length(UInt(1):UInt(1):UInt(0)) == 0
    @test length(typemax(UInt):UInt(1):(typemax(UInt)-1)) == 0
    @test length(typemax(UInt):UInt(2):(typemax(UInt)-1)) == 0
    @test length((typemin(Int)+3):5:(typemin(Int)+1)) == 0
end
# issue #6364
@test length((1:64)*(pi/5)) == 64

@testset "issue #6973" begin
    r1 = 1.0:0.1:2.0
    r2 = 1.0f0:0.2f0:3.0f0
    r3 = 1:2:21
    @test r1 + r1 == 2*r1
    @test r1 + r2 == 2.0:0.3:5.0
    @test (r1 + r2) - r2 == r1
    @test r1 + r3 == convert(StepRangeLen{Float64}, r3) + r1
    @test r3 + r3 == 2 * r3
end

@testset "issue #7114" begin
    let r = -0.004532318104333742:1.2597349521122731e-5:0.008065031416788989
        @test length(r[1:end-1]) == length(r) - 1
        @test isa(r[1:2:end],AbstractRange) && length(r[1:2:end]) == div(length(r)+1, 2)
        @test r[3:5][2] ≈ r[4]
        @test r[5:-2:1][2] ≈ r[3]
        @test_throws BoundsError r[0:10]
        @test_throws BoundsError r[1:10000]
    end

    let r = range(1/3, stop=5/7, length=6)
        @test length(r) == 6
        @test r[1] == 1/3
        @test abs(r[end] - 5/7) <= eps(5/7)
    end

    let r = range(0.25, stop=0.25, length=1)
        @test length(r) == 1
        @test_throws ArgumentError range(0.25, stop=0.5, length=1)
    end
end

# issue #7426
@test [typemax(Int):1:typemax(Int);] == [typemax(Int)]

#issue #7484
let r7484 = 0.1:0.1:1
    @test [reverse(r7484);] == reverse([r7484;])
end

@testset "issue #7387" begin
    for r in (0:1, 0.0:1.0)
        local r
        @test [r .+ im;] == [r;] .+ im
        @test [r .- im;] == [r;] .- im
        @test [r * im;] == [r;] * im
        @test [r / im;] == [r;] / im
    end
end
# Preservation of high precision upon addition
let r = (-0.1:0.1:0.3) + broadcast(+, -0.3:0.1:0.1, 1e-12)
    @test r[3] == 1e-12
end
=#
