import React from 'react';

const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const BookTickets = React.lazy(() => import('./Components/BookTickets/BookTickets'));
const ConfirmTicket = React.lazy(() => import('./Components/ConfirmTicket/ConfirmTicket'));

const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard, header: true, footer: true},
  { path: '/booking', exact: true, name: 'BookTickets', component: BookTickets, header: true, footer: true},
  { path: '/confirm/*', exact: true, name: 'ConfirmTicket', component: ConfirmTicket, header: true, footer: true},
];

export default routes;
