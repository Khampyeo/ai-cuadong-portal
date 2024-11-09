import {
  AccountBookOutlined,
  AlibabaOutlined,
  AndroidOutlined,
  AppleOutlined,
  AppstoreAddOutlined,
  BaiduOutlined,
  ChromeOutlined,
  DingdingOutlined,
  DiscordOutlined,
  DotNetOutlined,
  GitlabOutlined,
  GoogleOutlined,
  GooglePlusOutlined,
  HarmonyOSOutlined,
  IeOutlined,
  KubernetesOutlined,
  TwitchOutlined,
  TwitterOutlined,
  WindowsOutlined,
  XOutlined,
} from "@ant-design/icons";
import ChatbotIcon from "@/../public/icon/icon_chatbot.svg";
import AllIcon from "@/../public/icon/icon_list.svg";
import ProductIcon from "@/../public/icon/icon_product.svg";
import SupportIcon from "@/../public/icon/icon_support.svg";

export const FEATURES = [
  {
    key: 0,
    label: "All",
    icons: <AllIcon />,
  },
  {
    key: 1,
    label: "AI/ML Manufacturing",
    icons: <ProductIcon />,
  },
  {
    key: 2,
    label: "Retail Agent",
    icons: <ProductIcon />,
  },
  {
    key: 3,
    label: "Logistics Support",
    icons: <SupportIcon />,
  },
  {
    key: 4,
    label: "dMRV Applications",
    icons: <AllIcon />,
  },
  {
    key: 5,
    label: "Workforce",
    icons: <AllIcon />,
  },
  {
    key: 6,
    label: "ESG Showcases",
    icons: <SupportIcon />,
  },
];

export const ITEMS = [
  {
    key: 11,
    title: "Virtual Assistant",
    description:
      "AI programs that assist users with tasks and provide information through voice or text interactions.",
    icon: <AlibabaOutlined />,
    type: "AI",
    link: "http://lucy-ai.eastus.cloudapp.azure.com:3000",
  },
  {
    key: 0,
    title: "Chat bot",
    description:
      "Bring your favorite characters to life using this template. Simply define a few features of the character you want to create a bot for and start chatting away.",
    icon: <ChatbotIcon />,
    type: "chat",
  },
  {
    key: 1,
    title: "Predictive Analytics",
    description:
      "Uses historical data to predict future trends and outcomes for informed decision-making.",
    icon: <AndroidOutlined />,
    type: "data science",
  },
  {
    key: 2,
    title: "NLP Chatbot",
    description:
      "Conversational agents that use natural language processing to interact with users in human-like language.",
    icon: <AppleOutlined />,
    type: "AI",
  },
  {
    key: 3,
    title: "Computer Vision",
    description:
      "Enables machines to interpret and make decisions based on visual data from the environment.",
    icon: <WindowsOutlined />,
    type: "AI",
  },
  {
    key: 4,
    title: "AI-Powered Cameras",
    description:
      "Smart cameras that use artificial intelligence to analyze and respond to visual inputs in real time.",
    icon: <IeOutlined />,
    type: "technology",
  },
  {
    key: 5,
    title: "Recommendation Systems",
    description:
      "Suggest products or content to users based on their preferences and behavior patterns.",
    icon: <ChromeOutlined />,
    type: "AI",
  },
  {
    key: 6,
    title: "Deep Learning",
    description:
      "A subset of machine learning using neural networks with many layers to model complex patterns in data.",
    icon: <DingdingOutlined />,
    type: "AI",
  },
  {
    key: 7,
    title: "Image Recognition",
    description:
      "Identifies and classifies objects, people, or activities in images and videos.",
    icon: <TwitterOutlined />,
    type: "AI",
  },
  {
    key: 8,
    title: "Personalization Algorithms",
    description:
      "Tailor user experiences by customizing content and recommendations based on individual preferences.",
    icon: <GitlabOutlined />,
    type: "technology",
  },
  {
    key: 9,
    title: "Robotics",
    description:
      "Machines programmed to perform tasks autonomously or semi-autonomously, often replicating human actions.",
    icon: <GooglePlusOutlined />,
    type: "technology",
  },
  {
    key: 10,
    title: "AI-driven Logistics",
    description:
      "Enhances supply chain and logistics operations using AI for optimization and efficiency.",
    icon: <GoogleOutlined />,
    type: "AI",
  },

  {
    key: 12,
    title: "AI Customer Insights",
    description:
      "Analyzes customer data to gain actionable insights for better business decisions and strategies.",
    icon: <XOutlined />,
    type: "business",
  },
  {
    key: 13,
    title: "Machine Learning",
    description:
      "Algorithms that learn from data to make predictions or decisions without being explicitly programmed.",
    icon: <TwitchOutlined />,
    type: "AI",
  },
  {
    key: 14,
    title: "Predictive Modeling",
    description:
      "Uses statistical techniques to create models that predict future events based on current and historical data.",
    icon: <DiscordOutlined />,
    type: "data science",
  },
  {
    key: 15,
    title: "Generative AI",
    description:
      "Creates new content, such as text, images, or music, by learning patterns from existing data.",
    icon: <KubernetesOutlined />,
    type: "AI",
    link: "/generative-ai",
  },
  {
    key: 16,
    title: "Data Analytics",
    description:
      "Examines data sets to draw conclusions and insights, aiding in decision-making processes.",
    icon: <DotNetOutlined />,
    type: "data science",
  },
  {
    key: 17,
    title: "Autonomous Vehicles",
    description:
      "Self-driving cars that use AI to navigate and operate without human intervention.",
    icon: <BaiduOutlined />,
    type: "technology",
  },
  {
    key: 18,
    title: "Speech Recognition",
    description:
      "Converts spoken language into text using algorithms and machine learning.",
    icon: <HarmonyOSOutlined />,
    type: "AI",
  },
  {
    key: 19,
    title: "Facial Recognition",
    description:
      "Identifies or verifies a person's identity using their facial features.",
    icon: <AppstoreAddOutlined />,
    type: "AI",
  },
  {
    key: 20,
    title: "AI Ethics",
    description:
      "Study of moral issues and societal impact related to the development and use of artificial intelligence.",
    icon: <AccountBookOutlined />,
    type: "philosophy",
  },
];
