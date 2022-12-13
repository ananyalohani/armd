interface ArmdEventProperties extends Record<string, any> {
  referrer: string;
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  host: string;
  pathname: string;
  userAgent: string;
  userAgentData: string;
  clientWidth: number;
  clientHeight: number;
  screenWidth: number;
  screenHeight: number;
  selector: string;
  innerText: string;
  destination: string;
  ipAddress: string;
  country: string;
  continent: string;
}

interface ClickHouseEvent extends Record<string, any> {
  id: string;
  type: string;
  datetime: string;
  sessionId: string;
  prop_ip: string;
  prop_country: string;
  prop_continent: string;
  prop_referrer?: string;
  prop_client_x?: number;
  prop_client_y?: number;
  prop_offset_x?: number;
  prop_offset_y?: number;
  prop_page_x?: number;
  prop_page_y?: number;
  prop_screen_x?: number;
  prop_screen_y?: number;
  prop_host?: string;
  prop_pathname?: string;
  prop_user_agent?: string;
  prop_user_agent_data?: string;
  prop_client_width?: number;
  prop_client_height?: number;
  prop_screen_width?: number;
  prop_screen_height?: number;
  prop_selector?: string;
  prop_inner_text?: string;
  prop_destination?: string;
}

interface ArmdEvent {
  id: string;
  type: string;
  sessionId: string;
  timestamp: number;
  properties: Partial<ArmdEventProperties>;
}
