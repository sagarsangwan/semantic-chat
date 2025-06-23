export function ChatLayout() {
  const { data: session, status } = useSession();

  const [chatRooms, setChatRooms] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRooms = await fetchChatRoomsApi();
      setChatRooms(chatRooms);
    };
    fetchChatRooms();
    setLoading(false);
  }, []);
  console.log(chatRooms);
  // AI SDK chat hook
  //   const {
  //     messages: aiMessages,
  //     input,
  //     handleInputChange,
  //     handleSubmit,
  //   } = useChat({
  //     api: "/api/chat",
  //     onFinish: (message) => {
  //       // Analyze sentiment when message is received
  //       const sentiment = analyzeSentiment(message.content);
  //       addMessageWithSentiment(message.content, "assistant", sentiment);
  //     },
  //   });

  // Add a message with sentiment analysis
  //   const addMessageWithSentiment = (content, role, sentiment) => {
  //     const newSentiment = sentiment || analyzeSentiment(content);
  //     const newMessage = {
  //       id: Date.now().toString(),
  //       content,
  //       role,
  //       timestamp: new Date(),
  //       sentiment: newSentiment,
  //     };

  //     setMessages((prev) => [...prev, newMessage]);
  //   };

  //   // Handle form submission
  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     if (input.trim()) {
  //       // Add user message with sentiment
  //       addMessageWithSentiment(input, "user");
  //       // Let AI SDK handle the rest
  //       handleSubmit(e);
  //     }
  //   };

  return (
    <div>
      <div className="space-y-1 p-2">
        {chatRooms?.map((chatroom) => (
          <Button
            key={chatroom.id}
            variant="ghost"
            className="w-full justify-start"
          >
            <div className="flex w-full items-center gap-3 bg-red-500">
              <div className="relative">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={
                      chatroom?.other_participant?.social_accounts?.[0]
                        ?.extra_data?.picture
                    }
                    alt={chatroom.name}
                  />
                  <AvatarFallback>
                    {chatroom.other_participant.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {/* <StatusIndicator status={chatroom.status} /> */}
              </div>
              <div className="flex-1 truncate text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {
                      chatroom?.other_participant?.social_accounts?.[0]
                        ?.extra_data?.name
                    }
                  </span>
                  {chatroom.unread > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {chatroom.unread}
                    </Badge>
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {chatroom.lastMessage}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
