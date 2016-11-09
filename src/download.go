package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	resp, err := http.Get("http://google.com/")
	if err != nil {
		// handle error
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	fmt.Println(body)

}