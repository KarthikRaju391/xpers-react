import React from 'react'
import AddExpense from '../components/AddExpense'
import Filter from '../components/Filter'
import ExpenseList from '../components/ExpenseList'

function Home() {
   return (
      <div id='home'>
         <div className="container">
            <AddExpense />
            <Filter />
            <ExpenseList id='list'/>
         </div>
      </div>
   )
}

export default Home
