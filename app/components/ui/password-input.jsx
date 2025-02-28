"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef((props, ref) => {
    const { className, ...rest } = props;
    const [showPassword, setShowPassword] = useState(false);
    const disabled =
        rest.value === "" || rest.value === undefined || rest.disabled;

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                className={cn("hide-password-toggle pr-10", className)}
                ref={ref}
                {...rest}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
            >
                {showPassword && !disabled ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                </span>
            </Button>
            {/* Hides browsers' default password toggles */}
            <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
