import React from 'react'
import Header from '../components/Header'
import { sidebarAtom } from '../components/Sidebar/sidebarAtom'
import { useAtom } from 'jotai'
import Sidebar from '../components/Sidebar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Search from '../pages/Search'

export default function Protected() {
  const [visible] = useAtom(sidebarAtom)

	return (
		<BrowserRouter>
      <Header />
      <Sidebar />
      <main className={`mx-4 flex flex-col items-center duration-200 ease-in-out ${visible ? 'pl-16 md:pl-72' : 'pl-16'}`}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/search'>
            <Search />
          </Route>
          <Route path='*'>
            <h1>404</h1>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
	)
}
