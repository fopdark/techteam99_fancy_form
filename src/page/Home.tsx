import { Button, Input, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import pricesJSON from "../assets/prices.json";
import { useEffect, useState } from "react";
import TokenImage from "../components/TokenImage";

interface IToken {
  label: string;
  value: number;
}

function isValidNumber(value: any): boolean {
  return typeof value === "number" && !isNaN(value);
}

function Home() {
  const [prices, setPrices] = useState<Array<IToken>>([]);
  const [sourceCurrency, setSourceCurrency] = useState<number>(0);
  const [destinationCurrency, setDestinationCurrency] = useState<number>(0);
  const [amount, setAmount] = useState<number | string>("");
  const [convertedAmount, setConvertedAmount] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeInput = (e: any) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue) && inputValue[0] !== ".") {
      setAmount(inputValue);
    }
  };

  const handleConversion = () => {
    setLoading(true);
    setTimeout(() => {
      const rate = sourceCurrency / destinationCurrency;
      setConvertedAmount(`≈ ${(Number(amount) * rate).toFixed(7)}`);
      setLoading(false);
    }, 2000);
  };

  const transformPrices = () => {
    if (pricesJSON.length <= 0) return;
    const transformData = Array.from(
      new Map(pricesJSON.map((item) => [item.currency, item])).values()
    ).map((item) => ({
      label: item.currency,
      value: item.price,
    }));
    setPrices(transformData);
    setSourceCurrency(transformData[0].value);
    setDestinationCurrency(transformData[1].value);
  };

  useEffect(() => {
    transformPrices();
  }, []);

  if (prices.length <= 0) return;

  return (
    <div className="w-dvw h-dvh bg-[url('./images/bg-coin.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full  p-5 xl:p-10 max-w-96 bg-white rounded-2xl">
        <Title level={3} className="text-center">
          Fancy Form
        </Title>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Input
              autoFocus
              onChange={handleChangeInput}
              value={amount}
              onPressEnter={() => {
                if (
                  loading ||
                  !amount ||
                  !isValidNumber(sourceCurrency) ||
                  !isValidNumber(destinationCurrency)
                ) {
                  return;
                }
                handleConversion();
              }}
            />
            <Select
              value={sourceCurrency}
              onChange={(value: any) => {
                setSourceCurrency(value);
              }}
              options={prices}
              optionRender={(option) => (
                <Space>
                  <TokenImage
                    src={`./images/tokens/${option.data.label}.svg`}
                  />
                  {option.data.label}
                </Space>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input disabled value={convertedAmount} />
            <Select
              value={destinationCurrency}
              onChange={(value: number) => {
                setDestinationCurrency(value);
              }}
              options={prices}
              optionRender={(option) => (
                <Space>
                  <TokenImage
                    src={`./images/tokens/${option.data.label}.svg`}
                  />
                  {option.data.label}
                </Space>
              )}
            />
          </div>
          <Button
            className="max-w-full"
            onClick={handleConversion}
            loading={loading}
            disabled={
              loading ||
              !amount ||
              !isValidNumber(sourceCurrency) ||
              !isValidNumber(destinationCurrency)
            }
          >
            Convert
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
