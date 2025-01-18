"use client";
import { Button, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/auctionAction";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Inputs = {
  reservePrice: number;
  seller: string;
  winner: any;
  soldAmount: number;
  currentHighBid: number;
  createdAt: string;
  updatedAt: string;
  auctionEnd: string;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  id?: string;
};

type Props = {
  auction?: Auction;
};

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const {
    control,
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus]);

  async function onSubmit(data: FieldValues) {
    console.log(data);

    try {
      let id = "";
      let res;
      if (pathName === "auctions/create") {
        res = await createAuction(data);
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }

      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }

  //   console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{ required: "Year is required" }}
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          type="number"
          rules={{ required: "Mileage is required" }}
        />
      </div>

      {pathName === "auctions/create" && (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve price (0 if no reserve)"
              name="reservePrice"
              control={control}
              type="number"
              defaultValue={0}
              rules={{ required: "Reserve price is required" }}
            />
            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              control={control}
              dateFormat="dd MM yyyy hh:mm"
              showTimeSelect
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button
          outline
          isProcessing={isSubmitting}
          // disabled={!isValid}
          type="submit"
          color="success"
        >
          Submit
        </Button>
      </div>
      {/* register your input into the hook by invoking the "register" function
      <input defaultValue="test" {...register("example")}  />
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" /> */}
    </form>
  );
}
