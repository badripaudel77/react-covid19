import React, { Component } from 'react'

import api from '../api/covidapi'
import SearchBar from './SearchBar'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  country : 'Please Enter the country',
                  active_cases : 'No country found',
                  countries : [],
                  errorMessage : '',
                  isLoading : false,
              };
  }
        
  async componentDidMount() {
    
    const response = await api.get('/summary');
    console.log('data loaded   = >  ', response);
     
       console.log(response.data.Countries.length) // giving 247
       console.log('countries ', response.data.Countries) //lists all countries {....},{...}...
       
      this.setState({countries:response.data.Countries})

      // console.log('global end')
      this.setState({
          totalConfirmed : response.data.Global.TotalConfirmed,
      })
    } //component did mount ended.

      onSearchSubmit = async (country) =>{
            console.log(country)
  //https://api.covid19api.com/live/country/south-africa/status/confirmed       
            
            try {
  
              const response = 
                 await api.get(`/live/country/${country}/status/confirmed`)
          
      this.setState({country:country, active_cases:response.data[6].Active})      
                }
  
            catch(e) {
                    this.setState({errorMessage : "Country Doesn't exist or misspelled"})
               }  
    }; //onsearch submit ended.

  render() {

  return (
     <div>  
        <div className="container">
             <p style={{textAlign:'center',
                   backgroundColor:'green',            
                   color:'white',
                   width:'97%',margin:'auto',
                   padding:'24px',
                   marginTop:'12px',}}>
              Total confirmed as of now is <span> :  </span>   
                    <span style={{color : 'red'}} > 
                            {this.state.totalConfirmed}
                    </span>
          </p>
          <SearchBar onSubmit = {this.onSearchSubmit}/>
      </div>   

    <div className="container">
            <h2 className="bg bg-primary" style={{marginBottom:'0px', 
                      textAlign:'center',marginTop:'15px',
                      padding:'10px'}}>Covid19 Cases In single Country
             </h2>

   <table className="table table-striped">
          <thead>
                <tr>
                  <th>Country</th>
                  <th>Acitve Cases</th>
                </tr>
          </thead>
  
         <tbody>
                <tr>
                      <td>{this.state.country}</td>
                      <td>{ this.state.active_cases}</td>
                </tr>  
         </tbody> 
</table>

</div>

  <br />
  <hr />

<div className="container">
     <div style={{textAlign:'center',color:'red',fontWeight:'bold'}}>
      </div>
      
      <h2 className="bg bg-primary" style={{marginBottom:'0px',
          textAlign:'center', padding:'10px'}}> 
          Covid19 Cases Worldwide
     </h2>

   <table className="table table-striped table-hover table-dark">
            <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Country Name</th>
                    <th>Confirmed Cases</th>
                    <th> Total Deaths</th>
                    <th>Total Recovered</th>
                  </tr>
            </thead>
           <tbody>  
    {
      this.state.countries.map((country,i=0) => {
      return(
              <tr>
                    <td>{i++}</td>
                    <td> { country.Country } </td>
                    <td> { country.TotalConfirmed } </td>
                    <td>{ country.TotalDeaths }</td>
                    <td>{ country.TotalRecovered }</td>
              </tr>
      );
   })
  }
</tbody>
  </table> 
</div>              
</div>
  ); 
  }
}
 
export default App;