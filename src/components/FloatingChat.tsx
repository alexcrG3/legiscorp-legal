import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2,
  Minimize2
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const webhookUrl = 'https://devwebhook.luminaia.cc/webhook/909f14c3-9175-44c7-9894-3fa646369e73';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
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
          timestamp: userMessage.timestamp.toISOString(),
          source: 'Floating Chat Widget'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
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
          assistantResponse = JSON.stringify(data, null, 2);
        }
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantResponse || 'Lo siento, no pude generar una respuesta válida.',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Error en la comunicación con el servidor');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget */}
      {isOpen ? (
        <Card className="w-80 h-96 bg-card border shadow-2xl flex flex-col">
          {/* Header estilo WhatsApp */}
          <CardHeader className="bg-emerald-600 text-white p-3 rounded-t-lg flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Asistente Legal</h3>
                <p className="text-xs text-emerald-100">En línea</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-emerald-700"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-emerald-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
            {/* WhatsApp pattern background */}
            <div className="absolute inset-0 opacity-5 bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
            
            <ScrollArea className="h-full p-3 relative z-10">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    ¡Hola! Soy tu asistente legal. ¿En qué puedo ayudarte?
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] px-3 py-2 rounded-lg shadow-sm ${
                        message.role === 'user'
                          ? 'bg-emerald-500 text-white rounded-br-sm'
                          : 'bg-white dark:bg-gray-800 text-foreground rounded-bl-sm border'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.role === 'user' 
                            ? 'text-emerald-100' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 border rounded-lg rounded-bl-sm px-3 py-2 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-3 w-3 animate-spin text-emerald-600" />
                          <span className="text-xs text-muted-foreground">Escribiendo...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </div>

          {/* Input Area estilo WhatsApp */}
          <div className="bg-white dark:bg-gray-800 p-3 border-t">
            <div className="flex items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu consulta..."
                disabled={isLoading}
                className="flex-1 border-gray-300 rounded-full focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-9 w-9 p-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        /* Chat Button estilo WhatsApp */
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
          size="sm"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default FloatingChat;