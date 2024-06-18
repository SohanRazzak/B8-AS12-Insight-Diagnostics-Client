const Refund = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
            <p>
                At Insight Diagnostic Center, we strive to ensure our customers
                are satisfied with our services. If you are not entirely
                satisfied with your purchase, we are here to help.
            </p>
            <p>
                You have 30 calendar days to request a refund from the date you
                received the service. To be eligible for a refund, please
                contact us at{" "}
                <a href="mailto:insight-diagnostics@info.com">
                    insight-diagnostics@info.com
                </a>{" "}
                and provide details of your issue.
            </p>
            {/* Additional refund policy content */}
            <p className="mt-4">Our office address: Dhaka, Bangladesh.</p>
        </div>
    );
};

export default Refund;
