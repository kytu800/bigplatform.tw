package main

import "github.com/kataras/iris"

func main() {
	iris.Get("/", func(ctx *iris.Context) {
		hostname := iris.ParseHost(ctx.HostString())
		ctx.JSON(iris.StatusOK, hostname)
	})

	iris.Listen("localhost:5700")
}
