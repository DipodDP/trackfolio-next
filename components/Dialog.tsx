import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditPositionValidation } from "@/validation";
import { z } from "zod";
import Loader from "./shared/Loader";
import Link from "next/link";
import { Portfolio } from "@/app/(root)/portfolio/data/schema";
import { Dispatch, SetStateAction, useState } from "react";

interface DialogProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position: Portfolio;
  // children: React.ReactNode
}

// Define the shape of your form using a Zod schema.
// const EditPosition = () => {
//   const isUpdating = false
//   const id = useParams()
//   const { portfolio, setPortfolio } = usePortfolioContext()
//   console.log(portfolio)

export function EditPositionDialog({ open, setIsOpen, position }: DialogProps) {
  const isUpdating = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof EditPositionValidation>>({
    resolver: zodResolver(EditPositionValidation),
    defaultValues: {
      planProportionInPortfolio:
        parseFloat(
          position.plan_proportion_in_portfolio
            ? position.plan_proportion_in_portfolio
            : "0",
        ) * 100,
      targetProfit: parseFloat(position.target_profit) * 100 - 100,
      exitDrawdown: parseFloat(position.exit_drawdown) * 100,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EditPositionValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      {/* <Dialog> */}
      {/* <DialogTrigger asChild> */}
      {/*   {children} */}
      {/* </DialogTrigger> */}
      <DialogContent className="sm:w-420 flex-center flex-col bg-dark-1">
        <Form {...form}>
          <DialogHeader className="flex-center">
            <DialogTitle className="h3-bold md:h2-bold pt-5 sm:pt-12">
              <Link href="/edit-position">
                Edit targets of {position.name} position
              </Link>
            </DialogTitle>
            <DialogDescription className="text-light-3 small-medium md:base-regular mt-2">
              Set targets of current position
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="planProportionInPortfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proportion in portfolio</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      type="number"
                      inputMode="numeric"
                      placeholder="5 %"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the position proportion in portfolio as a percentage.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetProfit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target profit</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      type="number"
                      inputMode="numeric"
                      placeholder="65 %"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the target profit percent for a position.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exitDrawdown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exit drawdown</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      type="number"
                      inputMode="numeric"
                      placeholder="50 %"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the exit drawdown percent of a position.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <DialogFooter className="flex-center w-full">
            <div className="flex flex-col gap-5 w-full mt-4">
              <Button type="submit" className="shad-button_primary">
                {isUpdating ? (
                  <div className="flex-center gap-2">
                    <Loader />
                    Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
              <Button
                // variant="secondary"
                onClick={() => setIsOpen(false)}
                className="shad-button_secondary"
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
