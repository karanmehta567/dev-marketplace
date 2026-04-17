import SectionHeader from "@/components/common/section-header";
import { ProductForm } from "@/components/Products/Form";
import { SparklesIcon } from "lucide-react";

export default function Submit(){
    return (
        <section className="py-20">
            <div className="wrapper">
                <SectionHeader title="Submit Your Project" icon={SparklesIcon} description="Share Your Creation With Thousands of People Around The Globe"/>
            </div>
            <div className="mb-8">
                <div className="max-w-2xl mx-auto">
                    {/* Form */}
                    <ProductForm/>
                </div>
            </div>
        </section>
    )
}