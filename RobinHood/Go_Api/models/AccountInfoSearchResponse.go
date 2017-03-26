package models


type AccountInfoSearchResponse struct {
  Previous     interface{}           `json:"previous"`
  Results   []AccountInfo `json:"results"`
  Next         interface{}             `json:"nexts"`
}

// func (r AccountInfoSearchResponse) String() string {
//   retVal := ""
//   for index,element := range r.Results {
//     if index > 0 {
//       retVal = retVal + ", " + element.String()
//     } else {
//       retVal = element.String()
//     }
//   }
//   return retVal
// }
