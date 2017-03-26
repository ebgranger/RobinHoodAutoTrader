package models

import "time"

type AccountInfo struct {
	Deactivated bool `json:"deactivated"`
	UpdatedAt time.Time `json:"updated_at"`
	MarginBalances interface{} `json:"margin_balances"`
	Portfolio string `json:"portfolio"`
	CashBalances struct {
		CashHeldForOrders string `json:"cash_held_for_orders"`
		CreatedAt time.Time `json:"created_at"`
		Cash string `json:"cash"`
		BuyingPower string `json:"buying_power"`
		UpdatedAt time.Time `json:"updated_at"`
		CashAvailableForWithdrawal string `json:"cash_available_for_withdrawal"`
		OutstandingInterest string `json:"outstanding_interest"`
		UnclearedDeposits string `json:"uncleared_deposits"`
		UnsettledFunds string `json:"unsettled_funds"`
	} `json:"cash_balances"`
	WithdrawalHalted bool `json:"withdrawal_halted"`
	CashAvailableForWithdrawal string `json:"cash_available_for_withdrawal"`
	Type string `json:"type"`
	Sma interface{} `json:"sma"`
	SweepEnabled bool `json:"sweep_enabled"`
	DepositHalted bool `json:"deposit_halted"`
	BuyingPower string `json:"buying_power"`
	User string `json:"user"`
	MaxAchEarlyAccessAmount string `json:"max_ach_early_access_amount"`
	CashHeldForOrders string `json:"cash_held_for_orders"`
	OnlyPositionClosingTrades bool `json:"only_position_closing_trades"`
	URL string `json:"url"`
	Positions string `json:"positions"`
	CreatedAt time.Time `json:"created_at"`
	Cash string `json:"cash"`
	SmaHeldForOrders interface{} `json:"sma_held_for_orders"`
	AccountNumber string `json:"account_number"`
	UnclearedDeposits string `json:"uncleared_deposits"`
	UnsettledFunds string `json:"unsettled_funds"`
}

// type AccountInfo struct {
//     Results 									[]Result 			`json:"results"`
// }

// func (a AccountInfo) String() string {
//   return a.AccountNumber + ", " + a.BuyingPower
// }
