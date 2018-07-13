import React from 'react';
import { Route } from 'react-router-dom';
import AddChild from '../../containers/AddChild/AddChild';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Notify from '../../containers/Notify/Notify';
import Absentees from '../../containers/Absentees/Absentees';
import RequireAuth from '../../containers/Auth/RequireAuth';

export default () => {
  return (
      <main className="main">
        <div className="container-fluid">
          <div className="animated fadeIn">
            <div style={{paddingTop: '30px'}}>
              <Route exact path='/app' component={RequireAuth(Dashboard)} />
              <Route path='/app/add-child' component={RequireAuth(AddChild)} />
              <Route path='/app/notify' component={RequireAuth(Notify)} />
              <Route path='/app/absentees' component={RequireAuth(Absentees)} />
            </div>
          </div>
        </div>
      </main>
  );
}
