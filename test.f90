function re_get_error_message(this, stat) result(msg)
    class(regex) :: this
    integer,intent(in) :: stat
    integer(c_int) :: stat_
    character(len=:),allocatable :: msg
    integer(c_size_t) :: errorbuf_len, regerror
    character(kind=c_char, len=ERROR_BUF_SIZE) :: errorbuf
    stat_ = stat
    regerror = C_regerror(stat_, this%rem_data%preg, errorbuf, errorbuf_len)
    msg = errorbuf(1:index(errorbuf, C_NULL_char))
end function re_get_error_message