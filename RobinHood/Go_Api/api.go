package main

import (
	//"encoding/json"
	"fmt"
	//"html"
	"log"
	"net/http"
  "io/ioutil"
  "encoding/json"
  "strings"
  "./models"
	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter().StrictSlash(true)
  router.HandleFunc("/search/{stockTradeInput}", StockSearch).Methods("GET")
  router.HandleFunc("/accounts/{username}/{password}/{token}", GetAccount).Methods("GET")
  router.HandleFunc("/token/{username}/{password}", GetToken).Methods("POST")
  router.HandleFunc("/stock/buy/{symbol}/{price}/{quantity}/{stopPrice}/{instrument}/{accountNumber}/{token}", BuyStocks).Methods("POST")
  router.HandleFunc("/stock/sell/{symbol}/{price}/{quantity}/{instrument}/{accountNumber}/{token}", SellStocks).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", router))

}
  
func StockSearch(w http.ResponseWriter, req *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  params := mux.Vars(req)
  // url := "https://api.robinhood.com/quotes/TWTR/"
  url := "https://api.robinhood.com/quotes/?symbols="+ params["stockTradeInput"];
	res, err := http.Get(url)
  if err != nil {
    //do something with the err
  
  }
  defer res.Body.Close()
  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    //do something with err
  }
  var i models.StockInfoSearchResponse
  // fmt.Println(string(body))
  err = json.Unmarshal(body, &i)
  if err != nil{
    //do something with err
  }
  fmt.Println("search returned results", len(i.Results), i)
  json.NewEncoder(w).Encode(i)
}

func GetAccount(w http.ResponseWriter, req *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  params := mux.Vars(req)
  url := "https://api.robinhood.com/accounts/"

	payload := strings.NewReader("{\n\t\"username\": \"" + params["username"] + "\",\n\t\"password\": \"" + params["password"] + "\"\n}")

	req, _ = http.NewRequest("GET", url, payload)

	req.Header.Add("content-type", "application/json")
	req.Header.Add("authorization", "Token " + params["token"] +"")
	req.Header.Add("cache-control", "no-cache")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
  //fmt.Println(body)

  var i models.AccountInfoSearchResponse
  // fmt.Println(string(body))
  err := json.Unmarshal(body, &i)
  if err != nil{
    //do something with err
    log.Fatal(err)
  }
  fmt.Println("search returned results", len(i.Results), i)

	//fmt.Println(res)
  //fmt.Println(string(body))
  json.NewEncoder(w).Encode(i)

}

func GetToken(w http.ResponseWriter, req *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  params := mux.Vars(req)
  url := "https://api.robinhood.com/api-token-auth/"

	payload := strings.NewReader("{\n\t\"username\": \"" + params["username"] + "\",\n\t\"password\": \"" + params["password"] + "\"\n}")

	req, _ = http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/json")
	req.Header.Add("cache-control", "no-cache")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
  //fmt.Println(body)


  var i models.GetToken
  // fmt.Println(string(body))
  err := json.Unmarshal(body, &i)
  
  if err != nil{
    //do something with err
    log.Fatal(err)
  }

  // fmt.Println("body")
  fmt.Println("search returned results", string(i.Token))

	//fmt.Println(res)
  //fmt.Println(string(body))
  json.NewEncoder(w).Encode(i.Token)

}

func BuyStocks(w http.ResponseWriter, req *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  params := mux.Vars(req)
  //url := "https://api.robinhood.com/quotes/TWTR/"
  url := "https://api.robinhood.com/orders/"
   payload := strings.NewReader("{\n\t\"account\": \"https://api.robinhood.com/accounts/" + params["accountNumber"] + "/\",\n\t\"symbol\": \"" + params["symbol"] + "\",\n\t\"instrument\": \"" + params["instrument"] + "\",\n\t\"time_in_force\": \"gtc\",\n\t\"trigger\": \"stop\",\n\t\"type\": \"limit\",\n\t\"side\": \"buy\",\n\t\"price\": \"" + params["price"] + "\",\n\t\"quantity\": \"" + params["quantity"] + "\",\n\t\"stop_price\": \"" + params["stopPrice"] + "\"\n}")
   req, _ = http.NewRequest("POST", url, payload)
   req.Header.Add("accept", "application/json")
   req.Header.Add("authorization", "Token " + params["token"] + "")
   req.Header.Add("content-type", "application/json")
   req.Header.Add("cache-control", "no-cache")


   res, _ := http.DefaultClient.Do(req)
   defer res.Body.Close()
   body, _ := ioutil.ReadAll(res.Body)

   var i models.BuyStocksResponse
   // fmt.Println(string(body))
   err := json.Unmarshal(body, &i)
   if err != nil{
     //do something with err
     log.Fatal(err)
   }


	//fmt.Println(res)
  //fmt.Println(string(body))
  json.NewEncoder(w).Encode(i)
}

func SellStocks(w http.ResponseWriter, req *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  params := mux.Vars(req)
  //url := "https://api.robinhood.com/quotes/TWTR/"
  url := "https://api.robinhood.com/orders/"

	payload := strings.NewReader("{\n\t\"account\": \"https://api.robinhood.com/accounts/" + params["accountNumber"] + "/\",\n\t\"symbol\": \"" + params["symbol"] + "\",\n\t\"instrument\": \"" + params["instrument"] + "/\",\n\t\"time_in_force\": \"gtc\",\n\t\"trigger\": \"immediate\",\n\t\"type\": \"limit\",\n\t\"side\": \"sell\",\n\t\"price\": \"" + params["price"] + "\",\n\t\"quantity\": \"" + params["quantity"] + "\"\n}")


	req, _ = http.NewRequest("POST", url, payload)

	req.Header.Add("accept", "application/json")
	req.Header.Add("authorization", "Token " + params["token"] + "")
  req.Header.Add("content-type", "application/json")
	req.Header.Add("cache-control", "no-cache")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

  var i models.SellStocksResponse
  // fmt.Println(string(body))
  err := json.Unmarshal(body, &i)
  if err != nil{
    //do something with err
    log.Fatal(err)
  }


	fmt.Println(string(body))
  fmt.Println(i)
  json.NewEncoder(w).Encode(i)
}
