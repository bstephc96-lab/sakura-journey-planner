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
    <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
      <div
        ref={scrollRef}
        className="h-[480px] space-y-4 overflow-y-auto border border-border bg-muted p-6"
      >
        {messages.length === 0 && (
          <p className="pt-32 text-center font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Be the first to drop an idea
          </p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="border-l-2 border-sakura-deep bg-background p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-sm font-bold uppercase tracking-wide">
                {m.nickname}
              </span>
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {new Date(m.created_at).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink/85">{m.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="space-y-4 self-start border border-border bg-sakura p-6">
        <div>
          <label className="font-display text-[10px] font-bold uppercase tracking-widest text-ink/70">
            Your nickname
          </label>
          <Input
            placeholder="e.g. Sasha"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={40}
            className="mt-1 rounded-none border-ink/20 bg-background"
          />
        </div>
        <div>
          <label className="font-display text-[10px] font-bold uppercase tracking-widest text-ink/70">
            Your idea
          </label>
          <Textarea
            placeholder="Share a tip, restaurant, hidden gem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={5}
            className="mt-1 rounded-none border-ink/20 bg-background"
          />
        </div>
        <Button
          type="submit"
          disabled={sending}
          className="w-full rounded-none bg-ink font-display text-xs font-bold uppercase tracking-widest text-background hover:bg-ink/85"
        >
          <Send className="mr-2 h-4 w-4" /> Post idea
        </Button>
      </form>
    </div>
  );
}
