import { HomeIcon, Loader2Icon, ShipWheel, SparklesIcon} from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Suspense } from "react"
import CustomUserButton from "./custom-user-org"

const Logo=()=>{
    return (
        <Link href={'/'} className="flex items-center gap-2 group">
            <div className="size-8 flex items-center justify-center rounded-lg bg-primary">
                <SparklesIcon className="size-4 text-primary-foreground"/>
            </div>
            <span className="text-lg font-bold">
                <span className="font-bold text-xl">Dev</span><span className="text-primary">Space</span>
            </span>
        </Link>
    )
}
export default function Header(){
    // const isSignedIn:boolean=true
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="wrapper">
                <div className="flex items-center h-16 justify-between gap-4">
                    <Logo/>
                    <nav className="hidden md:flex items-center gap-1">
                        <Link href={'/'} className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors rounded-md">
                            <HomeIcon className="size-4 md:size-5"/>
                            <span className="hidden lg:inline">Home</span>
                        </Link>
                        <Link href={'/explore'} className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors rounded-md">
                            <ShipWheel className="size-4 md:size-5"/>
                            <span className="hidden lg:inline">Explore</span>
                        </Link>
                    </nav>
                    <nav className="flex items-center gap-1 md:gap-2">
                    <Suspense fallback={<div><Loader2Icon className="size-3 md:size-4"/>Loading...</div>}>
                    <Show when="signed-out">
                        <>
                            <SignUpButton>
                                <Button className="px-2 md:px-3 py-2 text-xs md:text-sm cursor-pointer">Sign Up</Button>
                            </SignUpButton>
                            <SignInButton>
                            <Button className="px-2 md:px-3 py-2 text-xs md:text-sm cursor-pointer" variant={'ghost'}>Sign In</Button>
                            </SignInButton>
                        </>
                    </Show>
                    </Suspense>
                    <Suspense fallback={<div><Loader2Icon className="size-3 md:size-4"/>Loading...</div>}>
                        <Show when="signed-in">
                            <Button asChild size={'sm'} className="text-xs md:text-sm">
                                <Link href={'/submit'}>
                                    <SparklesIcon className="size-3 md:size-4"/>
                                    <span className="hidden sm:inline">Submit</span>
                                </Link>
                            </Button>
                        <CustomUserButton/>
                        </Show>
                    </Suspense>
                    </nav>
                </div>
            </div>
        </header>
    )
}