
"""
    StaticUnitRange

Supertype for `UnitSRange` and `UnitMRange`. It's subtypes should behave
identically to `UnitRange`.
"""
abstract type StaticUnitRange{T<:Real} <: AbstractUnitRange{T} end

Base.firstindex(::StaticUnitRange) = 1

Base.lastindex(r::StaticUnitRange) = length(r)

function Base.show(io::IO, r::StaticUnitRange)
    print(io, typeof(r).name, "(", repr(first(r)), ':', repr(last(r)), ")")
end

"""
    UnitSRange

A static range parameterized by a `start` and `stop` of type `T`, filled with
elements spaced by `1` from `start` until `stop` is exceeded. The syntax `a:b`
with `a` and `b` both `Integer`s creates a `UnitRange`.
"""
struct UnitSRange{T,F,L} <: StaticUnitRange{T}

    function UnitSRange{T}(start, stop) where {T<:Real}
        return new{T,start,Base.unitrange_last(start,stop)}()
    end
end

Base.first(::UnitSRange{T,F,L}) where {T,F,L} = F
Base.last(::UnitSRange{T,F,L}) where {T,F,L} = L

function Base.getproperty(r::StaticUnitRange, s::Symbol)
    if s === :start
        return first(r)
    elseif s === :stop
        return last(r)
    else
        error("type $(typeof(r)) has no property $s")
    end
end

"""
    UnitMRange

A mutable range parameterized by a `start` and `stop` of type `T`, filled with
elements spaced by `1` from `start` until `stop` is exceeded. The syntax `a:b`
with `a` and `b` both `Integer`s creates a `UnitRange`.
"""
mutable struct UnitMRange{T<:Real} <: StaticUnitRange{T}
    start::T
    stop::T

    function UnitMRange{T}(start, stop) where {T<:Real}
        return new(start, Base.unitrange_last(start,stop))
    end
end

Base.first(r::UnitMRange) = getfield(r, :start)
Base.last(r::UnitMRange) = getfield(r, :stop)

for (F,f) in ((:M,:m), (:S,:s))
    UR = Symbol(:Unit, F, :Range)
    frange = Symbol(f, :range)
    @eval begin
        Base.AbstractUnitRange{T}(r::R) where {T,R<:$(UR)} = $(UR){T}(r)
        $(UR)(start::T, stop::T) where {T<:Real} = $(UR){T}(start, stop)
        $(UR){T}(r::AbstractUnitRange) where {T<:Real} = $(UR){T}(first(r), last(r))
        $(UR)(r::AbstractUnitRange) = $(UR)(first(r), last(r))

        $(UR){T}(r::$(UR){T}) where {T<:Real} = r
        $(UR){T}(r::$(UR)) where {T<:Real} = $(UR){T}(first(r), last(r))
    end
end
