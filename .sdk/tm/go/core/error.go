package core

type ImgurError struct {
	IsImgurError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewImgurError(code string, msg string, ctx *Context) *ImgurError {
	return &ImgurError{
		IsImgurError: true,
		Sdk:              "Imgur",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ImgurError) Error() string {
	return e.Msg
}
