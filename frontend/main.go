package main

import (
	"net/http"
	//"os"
)

func main() {
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./"))))
	//if os.Args[1] == "local" {
		http.ListenAndServe(":3000", nil)
	//}
	//if os.Args[1] == "ext" {
		//http.ListenAndServe(":35291", nil)
	//}
}
