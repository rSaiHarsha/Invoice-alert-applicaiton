import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TabItem from '../TabItem'
import InvoiceItem from '../InvoiceItem'
import Header from '../Header'
import Cookies from 'js-cookie'
import  {Navigate} from 'react-router-dom'
import './index.css'

const tabs = [
  {id: 1, tab: 'All'},
  {id: 2, tab: 'Due'},
  {id: 3, tab: 'Paid'},
]
// Write your code here

const resultsStatusStates = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    invoiceList: [],
    activeTab: tabs[0].id,
    resultsStatus: resultsStatusStates.initial,
  }

  componentDidMount = () => {
    this.getInvoices()
  }

  updateTab = id => {
    this.setState({activeTab: id})
  }

  getInvoices = async () => {
   // this.setState({resultsStatus: resultsStatusStates.loading})
    const url = `http://localhost:3000/api/invoices`
    console.log('url', url)
    const options = {
        method : 'GET'
    }
    const fetchedData = await fetch(url,options)
    if (fetchedData.ok === true) {
      const data = await fetchedData.json() 
      const updatedData = data.map((eachItem) => {
        const date = new Date(eachItem.dueDate);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      
        return {
          sn_no: null,
          amount: eachItem.amount,
          dueDate: formattedDate,
          status: eachItem.status,
          email: eachItem.recipientEmail
        };
      });
      
     this.setState({
        invoiceList: updatedData,
     })
    } else {
      console.log("failed")
    }
  }
 getInvoicesHeader = () => (
    <div className='invoice_table_header'>
            <p className='sn_no_col col_name'>S.L No</p>
            <p className='invoice_id_col col_name'>Invoice Id</p>
            <p className='email_col col_name'>E-Mail</p>
            <p className='amount_col col_name'>Amount</p>
            <p className='status_col col_name'>Status</p>
            <p className='due_date_col col_name'>Due Date</p>

    </div>
 )
  renderSuccessPage = () => {
    const {invoiceList,activeTab} = this.state 
    let filteredInvoicesList = []
    if(activeTab == 1){
        filteredInvoicesList = invoiceList
    }else if(activeTab == 2){
        filteredInvoicesList = invoiceList.filter((eachItem)=>(eachItem.status === 'due'))
    }else{
        filteredInvoicesList = invoiceList.filter((eachItem)=>(eachItem.status === 'paid'))
    }
    let num = 0;
    filteredInvoicesList = filteredInvoicesList.map((eachItem)=>{
        num = num+1;
        eachItem.sn_no = num
        return eachItem
    })
   // console.log("filtered",filteredInvoicesList)
    return (
        <div className='all_invoices_container'>
            {this.getInvoicesHeader()}
            <div>
                {filteredInvoicesList.map((eachInvoice)=>(
                    <InvoiceItem invoiceDetails = {eachInvoice} key={eachInvoice.sn_no}/>
                ))}
            </div>
        </div>
    )
  }

//   renderLoadingPage = () => (
//     <div className="loading_element_bg_container" data-testid="loader">
//       <Loader
//         type="ThreeDots"
//         color="#0284c7"
//         width={80}
//         height={80}
//         className="loader_element"
//       />
//     </div>
//   )

//   renderFailureViewPage = () => (
//     <div className="failure_view_bg_container">
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
//         alt="failure view"
//         className="failure_view_img_element"
//       />
//       <h1 className="failure_view_heading_element">Something Went Wrong</h1>
//     </div>
//   )

//   displayResults = status => {
//     switch (status) {
//       case resultsStatusStates.success:
//         return this.renderSuccessPage()

//       case resultsStatusStates.failure:
//         return this.renderFailureViewPage()

//       case resultsStatusStates.loading:
//         return this.renderLoadingPage()

//       default:
//         return null
//     }
//   }

  render() {
    const {activeTab, resultsStatus} = this.state
    const token = Cookies.get('token');
    console.log(token)
    if(token === undefined){
      return <Navigate to='/login' />
    
    }
    return (
        <>
        <Header />
      <div className="invoice_background_container">
        
        <h1 className="main_heading">User Invoices</h1>
        <ul className="tab_items_bg_container">
          {tabs.map(eachItem => (
            <TabItem
              tabDetails={eachItem}
              key={eachItem.id}
              isActive={activeTab === eachItem.id}
              updateTab={this.updateTab}
            />
          ))}
        </ul>
        {this.renderSuccessPage()}
      </div>
      </>
    )
  }
}

export default GithubPopularRepos