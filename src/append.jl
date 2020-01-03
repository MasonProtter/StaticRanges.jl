"""
    append_axis(x, y)

Returns the appended axes `x` and `y`. New subtypes of `AbstractAxis` must
implement a unique `append_axis` method.

## Examples
```jldoctest
julia> using AbstractAxis: append_axis!

julia> x, y = Axis(UnitMRange(1, 10)), SimpleAxis(UnitMRange(1, 10));

julia> append_axis(x, y)
Axis(UnitMRange(1:20) => OneToMRange(20))

julia> append_axis(y, x)
SimpleAxis(UnitMRange(1:20))
```
"""
function append_axis(x::Axis, y::Axis)
    return Axis{combine_names(x, y)}(append_keys(x, y), append_values(x, y))
end
function append_axis(x::SimpleAxis, y::SimpleAxis)
    return SimpleAxis{combine_names(x, y)}(append_values(x, y))
end
append_axis(x, y) = same_type(x, y) ? append_values(x, y) : append_axis(promote(x, y)...)
#=
function append_axis(x::AbstractVector, y::AbstractVector)
    return same_type(x, y) ? append_values(x, y) : append_axis(promote(x, y)...)
end
append_axis(x::AbstractAxis, y::AbstractVector) = append_axis(promote(x, y)...)
append_axis(x::AbstractVector, y::AbstractAxis) = append_axis(promote(x, y)...)
append_axis(x::AbstractAxis, y::AbstractAxis) = append_axis(promote(x, y)...)
=#

"""
    append_keys(x, y)

Returns the appropriate keys of and index within the operation `append_axis(x, y)`

See also: [`append_axis`](@ref)
"""
append_keys(x, y) = cat_keys(x, y)

"""
    append_axis!(x, y)

Returns the appended axes `x` and `y`. New subtypes of `AbstractAxis` must
implement a unique `append_axis!` method.

## Examples
```jldoctest
julia> using AbstractAxis: append_axis!

julia> x, y = Axis(UnitMRange(1, 10)), SimpleAxis(UnitMRange(1, 10));

julia> append_axis!(x, y)
Axis(UnitMRange(1:20) => OneToMRange(20))

julia> append_axis!(y, x)
SimpleAxis(UnitMRange(1:30))
```
"""
function append_axis!(x::Axis, y)
    _append_keys!(keys(x), y)
    set_length!(values(x), length(x) + length(y))
    return x
end
function append_axis!(x::SimpleAxis, y)
    set_length!(x, length(x) + length(y))
    return x
end

_append_keys!(x, y) = __append_keys!(Continuity(x), x, y)
__append_keys!(::ContinuousTrait, x, y) = set_length!(x, length(x) + length(y))
__append_keys!(::DiscreteTrait, x, y) = make_unique!(x, keys(y))

"""
    append_axes(x, y)

Returns the axes for `append(x, y)`.
"""
append_axes(x::AbstractVector, y::AbstractVector) = (append_axis(axes(x, 1), axes(y, 1)),)

"""
    append_values(x, y)

Returns the appropriate values of and index within the operation `append_axis(x, y)`

See also: [`append_axis`](@ref)
"""
append_values(x, y) = cat_values(x, y)

"""
    append_axes!(x, y)

Returns the axes for `append!(x, y)`.
"""
append_axes!(x::AbstractVector, y::AbstractVector) = (append_axis!(axes(x, 1), axes(y, 1)),)
