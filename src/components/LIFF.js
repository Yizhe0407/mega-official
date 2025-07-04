import liff from "@line/liff";
import { useStepStore } from "@/store/step-store";

export default function LIFF() {
    const step1Data = useStepStore((state) => state.step1Data);
    const step2Data = useStepStore((state) => state.step2Data);
    const step3Data = useStepStore((state) => state.step3Data);

    const sendLineMessage = async () => {
        try {
            const flexMessage = {
                type: "flex",
                altText: "預約成功通知",
                contents: {
                    type: "bubble",
                    body: {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                text: "預約資訊",
                                weight: "bold",
                                size: "xxl",
                                margin: "md"
                            },
                            {
                                type: "separator",
                                margin: "xxl"
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                margin: "xxl",
                                spacing: "sm",
                                contents: [
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "日期 Date",
                                                size: "md",
                                                color: "#555555",
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: step3Data.date,
                                                size: "md",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "時間 Time",
                                                size: "md",
                                                color: "#555555",
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: step3Data.time,
                                                size: "md",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "separator",
                                        margin: "xxl"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        margin: "xxl",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "姓名 Name",
                                                size: "md",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: step1Data.name,
                                                size: "md",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "連絡電話 Phone",
                                                size: "md",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: step1Data.phone,
                                                size: "md",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "車牌號碼 License",
                                                size: "md",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: step1Data.license,
                                                size: "md",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "服務項目 Services",
                                                size: "md",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: step2Data.selectServe.join(', '),
                                                size: "md",
                                                color: "#111111",
                                                align: "end",
                                                wrap: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "separator",
                                margin: "xxl"
                            },
                            {
                                type: "box",
                                layout: "horizontal",
                                margin: "md",
                                contents: [
                                    {
                                        type: "text",
                                        text: "到府牽車 Pickup Service",
                                        size: "sm",
                                        color: "#aaaaaa",
                                        flex: 0
                                    },
                                    {
                                        type: "text",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        align: "end",
                                        text: step2Data.extra ? "是" : "否"
                                    }
                                ]
                            }
                        ]
                    },
                    styles: {
                        footer: {
                            separator: true
                        }
                    }
                }
            };

            await liff.sendMessages([flexMessage]);
            return true;
        } catch (error) {
            console.error('LINE 訊息發送失敗:', error);
            return false;
        }
    };

    return { sendLineMessage };
}
