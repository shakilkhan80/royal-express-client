import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';


const About = () => {
    return (
        <div className='my-32'>
            <Accordion>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                        Royal Express কি?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                          Royal Express একটি প্রযুক্তিনির্ভর লজিস্টিকস কোম্পানি যা দেশজুড়ে এসএমই প্রোডাক্ট ডেলিভারি সেবা থেকে শুরু করে ব্যাক্তিগত ডকুমেন্ট, পার্সেল ডেলিভারি, এবং বড় কর্পোরেট কোম্পানিগুলোকে ইন্ডাস্ট্রিয়াল লজিস্টিকস সেবা প্রদান করে থাকে।
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                          Royal Express কি কি ধরনের সেবা দিয়ে থাকে?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            যে কোন ব্যবসা বা ব্যক্তিগত প্রয়োজনে ডেলিভারি সংক্রান্ত সেবা প্রদানের একটি পূর্ণাঙ্গ প্ল্যাটফর্ম Royal Express। পার্সেল ডেলিভারি, বাল্ক শিপমেন্ট, লাইন হল, ট্রাক ভাড়া, লোডিং-আনলোডিং, ওয়্যারহাউজ, সার্ভিস হিসেবে লজিস্টিকস সল্যুশন এবং প্রয়োজন অনুযায়ী কাস্টমাইজড সল্যুশনও দিয়ে থাকে Royal Express ।
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            আপনাদের লজিস্টিকস চার্জ সম্পর্কে জানতে চাই?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            মার্চেন্টদের পার্সেল ডেলিভারিতে আমরা প্রতি কেজি অনুযায়ী চার্জ করে থাকি l ঢাকার ভেতরে প্রতি কেজি ৬৯ টাকা, ঢাকার আশেপাশে ১১৫ এবং ঢাকার বাইরে ১৫০ টাকা থেকে চার্জ শুরু হয়। ঢাকার আশেপাশে এবং বাইরে প্রতি ডেলিভারিতে ১% ক্যাশ অন ডেলিভারি চার্জ প্রযোজ্য। প্রতিটি চার্জের সাথে ভ্যাট সংযুক্ত।

                            ব্যক্তিগত পার্সেল পাঠানোর চার্জ সম্পর্কে জানতে আমাদের হোম ডেলিভারি এবং হাব ডেলিভারির প্রাইস চার্টটি দেখুন।

                            এন্টারপ্রাইজ লজিস্টিকসের জন্য আমাদের দক্ষ সেলস টিম রয়েছে। 000000 নাম্বারে কল দিয়ে এ সংক্রান্ত সকল তথ্য পাবেন।

                            অনুগ্রহপূর্বক মনে রাখবেন ওজন এবং অবস্থানের ভিত্তিতে ডেলিভারি চার্জ পরিবর্তন হতে পারে l এ বিষয়ে আরও বিস্তারিত জানতে লিঙ্কে ক্লিক করুন এবং আমাদের প্রাইস সম্পর্কে আরো বিস্তারিত জানুন l
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>


            
            </Accordion>
        </div>
    );
};

export default About;