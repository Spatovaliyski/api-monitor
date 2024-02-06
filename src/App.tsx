import React from 'react';

import Dashboard from '@pages/Dashboard/dashboard.page';
import './App.css';
import SiteContainer from '@organisms/Container/site-container.component';
import Navigation from '@organisms/Navigation/navigation.component';
import NavigationItem from '@atoms/NavigationItem/navigation-item.component';

import { RxDashboard, RxActivityLog  } from "react-icons/rx";
import { CiCreditCard1, CiSettings  } from "react-icons/ci";

import NavStyles from '@organisms/Navigation/navigation.module.scss';
import Heading from '@organisms/Heading/heading.component';

function App() {
  return (
    <>
      <main className="site-main">
        <aside className="sidebar">
          <Heading className={'menu-heading'} type={'h4'} text={'Menu'} />
          {/** For the purposes of visual demonstration. No Routing actually implemented. */}
          <Navigation>
            <NavigationItem className={NavStyles.active} href={'/'} label={'Dashboard'} icon={<RxDashboard />} />
            <NavigationItem href={'/logs'} label={'Logs'} icon={<RxActivityLog />} />
            <NavigationItem href={'/settings'} label={'Settings'} icon={<CiSettings />} />
            <NavigationItem href={'/billing'} label={'Billing'} icon={<CiCreditCard1 />} />
          </Navigation>
        </aside>

        <SiteContainer className={'container'}>
          <Dashboard />
        </SiteContainer>
      </main>
    </>
  )
}

export default App;
