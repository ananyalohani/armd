import { SimpleGrid } from '@chakra-ui/react';
import ActiveUsersDashboard from '../components/dashboards/ActiveUsersDashboard';
import ReferringDomainDashboard from '../components/dashboards/ReferringDomainDashboard';
import RouteViewsDashboard from '../components/dashboards/RouteViewsDashboard';
import Layout from '../components/Layout';

export enum DashboardType {
  ACTIVE_USERS,
  PAGE_VIEWS,
  DOMAINS,
  ROUTE_VIEWS,
  COUNTRIES,
}

export default function Dashboards() {
  return (
    <Layout heading='Dashboards'>
      <SimpleGrid columns={2} spacing={8}>
        <ActiveUsersDashboard />
        <ReferringDomainDashboard />
        <RouteViewsDashboard />
      </SimpleGrid>
    </Layout>
  );
}

// Types:
// Active users
// Pageviews
// Referring Domain - add this to event properties
// Route views
// Countries visiting
