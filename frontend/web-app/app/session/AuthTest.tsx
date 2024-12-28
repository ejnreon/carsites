"use client";
import React, { useState } from "react";
import { updateAuctionTest } from "../actions/auctionAction";
import { Button } from "flowbite-react";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();
  const [counter, setCounter] = useState<number>(0);

  function doUpdate() {
    console.log("duap");
    setCounter(counter + 1);
    setResult(undefined);
    setLoading(true);
    updateAuctionTest()
      .then((res) => {
        setResult(res);
        console.log("duap", 2);
      })
      .catch((err) => {
        setResult(err);
        console.log("duap", 3, err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex items-center gap-4">
      <Button outline isProcessing={loading} onClick={doUpdate}>
        test auth {counter}
      </Button>
      <div> {JSON.stringify(result)}</div>
    </div>
  );
}
