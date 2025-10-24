import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Plus, 
  Bot, 
  User, 
  Edit3, 
  Trash2,
  MessageSquare,
  Loader2,
  Search
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

const ConsultorIA = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Nueva conversación',
      messages: [],
      lastUpdated: new Date()
    }
  ]);
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const webhookUrl = 'https://devwebhook.luminaia.cc/webhook/909f14c3-9175-44c7-9894-3fa646369e73';

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.messages.some(message => 
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    updateConversation(activeConversationId, userMessage);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_id: activeConversationId,
          timestamp: userMessage.timestamp.toISOString(),
          source: 'Legiscorp Dashboard'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // El "Respond to Webhook" de n8n puede devolver la respuesta directamente
        // o en diferentes formatos. Verificamos varios posibles campos:
        let assistantResponse = '';
        
        if (typeof data === 'string') {
          assistantResponse = data;
        } else if (data.response) {
          assistantResponse = data.response;
        } else if (data.message) {
          assistantResponse = data.message;
        } else if (data.text) {
          assistantResponse = data.text;
        } else if (data.output) {
          assistantResponse = data.output;
        } else {
          // Si no encontramos un campo reconocido, convertimos toda la respuesta a texto
          assistantResponse = JSON.stringify(data, null, 2);
        }
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantResponse || 'El agente procesó tu consulta pero no pudo generar una respuesta válida.',
          timestamp: new Date()
        };

        updateConversation(activeConversationId, assistantMessage);
        
        // Update conversation title after first complete exchange (user + AI)
        if (activeConversation?.messages.length === 1 && activeConversation.title === 'Nueva conversación') {
          const descriptiveTitle = userMessage.content.length > 50 
            ? userMessage.content.slice(0, 50) + '...'
            : userMessage.content;
          updateConversationTitle(activeConversationId, descriptiveTitle);
        }
      } else {
        throw new Error('Error en la comunicación con el servidor');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo.',
        timestamp: new Date()
      };

      updateConversation(activeConversationId, errorMessage);
      
      toast({
        title: "Error",
        description: "No se pudo enviar la consulta. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConversation = (conversationId: string, message: Message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastUpdated: new Date()
        };
      }
      return conv;
    }));
  };

  const updateConversationTitle = (conversationId: string, title: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, title };
      }
      return conv;
    }));
  };

  const createNewConversation = () => {
    // Antes de crear una nueva conversación, guardar la actual con un nombre descriptivo
    if (activeConversation && activeConversation.messages.length > 0 && activeConversation.title === "Nueva conversación") {
      const firstUserMessage = activeConversation.messages.find(m => m.role === "user");
      if (firstUserMessage) {
        const descriptiveTitle = firstUserMessage.content.length > 50 
          ? firstUserMessage.content.slice(0, 50) + "..."
          : firstUserMessage.content;
        updateConversationTitle(activeConversationId, descriptiveTitle);
      }
    }

    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "Nueva conversación",
      messages: [],
      lastUpdated: new Date()
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const deleteConversation = (conversationId: string) => {
    if (conversations.length === 1) {
      toast({
        title: "Error",
        description: "No puedes eliminar la última conversación.",
        variant: "destructive",
      });
      return;
    }

    setConversations(prev => prev.filter(c => c.id !== conversationId));
    
    if (activeConversationId === conversationId) {
      const remainingConversations = conversations.filter(c => c.id !== conversationId);
      setActiveConversationId(remainingConversations[0]?.id || '');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-primary" />
              <div>
                <h1 className="font-bold text-foreground">Legiscorp</h1>
                <p className="text-xs text-muted-foreground">Consultor Legal IA</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={createNewConversation}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva conversación
          </Button>

          {/* Search conversations */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 'No se encontraron conversaciones' : 'Sin conversaciones'}
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    activeConversationId === conversation.id
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setActiveConversationId(conversation.id)}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{conversation.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {conversation.lastUpdated.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {conversations.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer Info */}
        <div className="p-4 border-t border-border">
          {/* Footer space reserved for future content */}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {activeConversation?.messages.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Bienvenido al Consultor Legal IA
                </h3>
                <p className="text-muted-foreground">
                  Escribe tu consulta legal y nuestro asistente te ayudará con información especializada.
                </p>
              </div>
            ) : (
              activeConversation?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    
                    <Card className={`${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-card'
                    }`}>
                      <CardContent className="p-4">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <Card className="bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm text-muted-foreground">Procesando consulta...</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu consulta legal..."
                  disabled={isLoading}
                  className="resize-none min-h-[44px] bg-background"
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 h-[44px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Legiscorp puede cometer errores. Considera verificar la información importante.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultorIA;