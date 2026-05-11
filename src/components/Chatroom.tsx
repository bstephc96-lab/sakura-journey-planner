import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { Send } from "lucide-react";

type Msg = {
  id: string;
  nickname: string;
  message: string;
  created_at: string;
};

const schema = z.object({
  nickname: z.string().trim().min(1, "Add a nickname").max(40),
  message: z.string().trim().min(1, "Say something!").max(500),
});

export function Chatroom() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [nickname, setNickname] = useState(
    () => (typeof window !== "undefined" && localStorage.getItem("jp_nick")) || "",
  );
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(500)
      .then(({ data }) => {
        if (active && data) setMessages(data as Msg[]);
      });

    const channel = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          setMessages((m) => [...m, payload.new as Msg]);
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ nickname, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSending(true);
    localStorage.setItem("jp_nick", parsed.data.nickname);
    const { error } = await supabase.from("chat_messages").insert(parsed.data);
    setSending(false);
    if (error) {
      toast.error("Couldn't send — try again");
      return;
    }
    setMessage("");
  };

  return (
    <div className="rounded-3xl border-2 border-sakura/40 bg-white/70 p-6 shadow-[var(--shadow-petal)] backdrop-blur">
      <div
        ref={scrollRef}
        className="mb-4 h-80 space-y-3 overflow-y-auto rounded-2xl bg-gradient-to-b from-sakura/10 to-white p-4"
      >
        {messages.length === 0 && (
          <p className="pt-24 text-center font-hand text-2xl text-muted-foreground">
            Be the first to drop an idea ✨
          </p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display font-bold text-sakura-deep">{m.nickname}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(m.created_at).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm text-ink">{m.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="space-y-2">
        <Input
          placeholder="Your nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={40}
          className="bg-white"
        />
        <div className="flex gap-2">
          <Textarea
            placeholder="Share an idea, a tip, a must-eat..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={2}
            className="bg-white"
          />
          <Button type="submit" disabled={sending} className="h-auto self-stretch px-5">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
