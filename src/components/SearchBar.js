import React, { Component } from 'react'
 class SearchBar extends Component {
     state = { 
           country : ''
      }

      onFormSubmit = (e) => {
                 e.preventDefault();
               // console.log('form submitted')
                this.setState({country:''})
                this.props.onSubmit(this.state.country)
      }

      onInputChange = (e) => {
            const country = e.target.value
            this.setState({country})
      }

     render() {
         return (
             
            <form onSubmit = {this.onFormSubmit}>
                    
                    <div style={{width:'97%', margin:'auto',textAlign:'center',
                           backgroundColor:'gray',color:'white',
                           marginTop:'30px',padding:'20px'}}>
                        <label htmlFor="country">
                            Search for country 
                        </label>
                        
                        <input type="text" onChange={this.onInputChange} 
                        value={this.state.country} 
                        style={{height:'40px'}}
                         />
                        <br></br>
                    </div>
            </form>

       );
     }
 }
 
 export default SearchBar;