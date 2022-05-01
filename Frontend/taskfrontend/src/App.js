import React, { Suspense } from 'react'
import { Navigate, Route, Switch, Routes, BrowserRouter } from 'react-router-dom'
import routes from './routes'
import Footer from './Components/Footer/footer';
import Header from "./Components/Header/Header"
import Dashboard from "./Components/Dashboard/Dashboard"
import BookTickets from "./Components/BookTickets/BookTickets"
import ConfirmTicket from './Components/ConfirmTicket/ConfirmTicket';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"> Loading...</div>
  </div>
)
function App() {
  return (
    <div>
      {/* <Header/>
      <Router>
      <Suspense fallback={<p> Loading...</p>}>
        <Routes>
          <Route path='/' element={<Dashboard  suggestions={["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]}/>} />
        </Routes>
      </Suspense>
    </Router> */}
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            {routes.map((route, idx) => {
              console.log(routes[idx]?.path,"routes[idx]")
              return route.component && (
                <Route key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <>
                      {routes[idx].header ? <Header /> : ""}
                      {!routes[idx].footer ? '' : <Footer></Footer>}
                      {/* {<Dashboard/>} */}
                      {(()=>
                      {

                        if(routes[idx]?.path === "/confirm/*" )
                        {
                           <ConfirmTicket/> 
                        }
                        else if(routes[idx]?.path === "/booking")
                        {
                          <BookTickets/>
                        }
                        else{
                           <Dashboard/>
                        }
                      })
                    }
                      {routes[idx]?.path === "/booking" ? <BookTickets/> : routes[idx]?.path === "/confirm/*" ? <ConfirmTicket/> : routes[idx]?.path === "/" ? <Dashboard/> : ""}
                      {/* {routes[idx]?.path === "/confirm/*" ? <ConfirmTicket/> : ""} */}
                    </>
                  }
                  ></Route>
               
                  )
            })
            }
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
