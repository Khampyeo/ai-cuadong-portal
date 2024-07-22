type MessagePayload = {
  pc_id: string;
  input_text: string;
  use_gpt: string;
  conversation_histories: Message[];
  request_type: string;
};

type Message = {
  actor: "user" | "bot";
  message: string;
  sessionId: string;
};
