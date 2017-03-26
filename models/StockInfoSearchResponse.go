package models


type StockInfoSearchResponse struct {
  Results   []StockInfo `json:"results"`
}

func (r StockInfoSearchResponse) String() string {
  retVal := ""
  for index,element := range r.Results {
    if index > 0 {
      retVal = retVal + ", " + element.String()
    } else {
      retVal = element.String()
    }
  }
  return retVal
}
