"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropsWithChildren } from "react"
import { Contacts } from "../Contacts"
import { BookingForm } from "./BookingForm"
import { ScrollArea } from "../ui/scroll-area"

export function BookingPopover({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className="max-w-[90vw] sm:min-w-[600px]"
      >
        <ScrollArea className="max-h-[90svh]">
          <div className="flex flex-col gap-8 p-6 pt-8">
            <DialogHeader>
              <DialogTitle>Способ связи</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="write" className="flex w-full flex-col gap-8">
              <TabsList className="w-full">
                <TabsTrigger value="call">Позвонить</TabsTrigger>
                <TabsTrigger value="write">Написать</TabsTrigger>
              </TabsList>

              <TabsContent value="call" className="flex justify-center">
                <Contacts />
              </TabsContent>

              <TabsContent value="write">
                <BookingForm />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
