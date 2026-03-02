import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background-secondary">
            <div className="max-w-md w-full text-center space-y-6">
                <div
                    className="mx-auto flex items-center justify-center"
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "#EEF4FB",
                    }}
                >
                    <Search size={36} style={{ color: "#3E5E85" }} />
                </div>

                <div>
                    <h1
                        className="font-bold mb-2"
                        style={{ fontSize: "2rem", color: "#1A2433", lineHeight: 1.2 }}
                    >
                        Page Not Found
                    </h1>
                    <p style={{ color: "#5C6B7B", fontSize: "1rem", lineHeight: 1.6 }}>
                        We couldn't find the page you were looking for. It might have been
                        removed, renamed, or didn't exist in the first place.
                    </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-all hover:-translate-y-0.5"
                        style={{
                            background: "#3E5E85",
                            color: "#FFF",
                            boxShadow: "0 4px 14px rgba(62,94,133,0.25)",
                        }}
                    >
                        Return Home
                    </Link>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-all hover:-translate-y-0.5"
                        style={{
                            background: "white",
                            color: "#3E5E85",
                            border: "1px solid #CBDCEB",
                        }}
                    >
                        View Catalogue
                    </Link>
                </div>
            </div>
        </div>
    );
}
