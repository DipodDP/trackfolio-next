"use client";
import { usePortfolioContext } from "@/context/PortfolioContext";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
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

// Define the shape of your form using a Zod schema.
const EditPosition = () => {
    const isUpdating = false;
    const id = useParams();
    const { portfolio, setPortfolio } = usePortfolioContext();
    console.log(portfolio);

    // 1. Define your form.
    const form = useForm<z.infer<typeof EditPositionValidation>>({
        resolver: zodResolver(EditPositionValidation),
        defaultValues: {
            planProportionInPortfolio:
        parseFloat(portfolio.plan_positions[0].plan_proportion_in_portfolio) *
        100,
            targetProfit:
        parseFloat(portfolio.plan_positions[0].target_profit) * 100 - 100,
            exitDrawdown: parseFloat(portfolio.plan_positions[0].exit_drawdown) * 100,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof EditPositionValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                {/* <img src='/assets/images/logo.svg' /> */}
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Edit position targets
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
          Set targets of current position
                </p>

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
                    <Button type="submit" className="shad-button_secondary">
            Cancel
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
            Here you may go
                        <Link
                            href="/"
                            className="text-primary-500 text-small-semibold ml-1"
                        >
              Home
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default EditPosition;
