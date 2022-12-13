import { Text } from "@chakra-ui/react";
import PageviewFunnelsDashboard from "../components/dashboards/PageviewFunnelsDashboard";
import Layout from "../components/Layout";

export default function Funnels() {
  return (
    <Layout heading="Funnels">
      <Text mb="10">
        Shows how many of your users have completed 3 page views.
      </Text>
      <PageviewFunnelsDashboard />
    </Layout>
  );
}
