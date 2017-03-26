# moneyApi
### The goal of this project is to create an automated platform for trading low-priced US Equities, that end-users will be able to clone and run locally.

#### Resources
* End-users will need to have an account with [Robinhood](https://robinhood.com/)
* Good (unofficial) documentation on the Robinhood API [here](https://github.com/sanko/Robinhood)

#### Proposed Architecture
* Front-end UI
	* Editable user config to control price targets, buy-in sell-out points, etc.
	* run button
	* While running, dashboard showing current positions, buy price, and return, with a total account rollup at the bottom

* Back-end Stock screener
	* Would like to have some mechanism to filter stocks given certain parameters defined by the user. Currently exploring APIs we could hit

* Tracking, Logging, Data Storage
	* would be good to have