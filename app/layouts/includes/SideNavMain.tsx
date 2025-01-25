import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./MenuItem";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "./MenuItemFollow";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import { useEffect } from "react";
export default function SideNavMain() {
  let { setRandomUsers, randomUsers } = useGeneralStore();
  let contextUser = useUser();
  const pathname = usePathname();
  useEffect(() => {
    setRandomUsers();
  }, []);
  return (
    <>
      <div
        id="SideNavMain"
        className={`fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto ${
          pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]"
        }`}
      >
        <div className="lg:w-full w-[55px] mx-auto">
          <Link href="/">
            <MenuItem
              iconString="For You"
              colorString={pathname == "/" ? "#F02C56" : ""}
              sizeString="25"
            />
          </Link>
          <MenuItem
            iconString="Following"
            colorString="#000000"
            sizeString="25"
          />
          <MenuItem iconString="LIVE" colorString="#000000" sizeString="25" />
          <div className="border-b lg:ml-2 mt-2 "></div>
          <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
            Suggested accounts
          </h3>
          <div className="lg:hidden block pt-3"></div>
          <ClientOnly>
            <div className="cursor-pointer">
              {randomUsers.map((user, index) => (
                <MenuItemFollow user={user} key={index} />
              ))}
            </div>
          </ClientOnly>
          <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
            See all
          </button>
          {contextUser?.user?.id ? (
            <div>
              <div className="border-b lg:ml-2 mt-2 "></div>
              <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                Following accounts
              </h3>
              <div className="lg:hidden block pt-3"></div>
              <ClientOnly>
                <div className="cursor-pointer">
                  {randomUsers.map((user, index) => (
                    <MenuItemFollow user={user} key={index} />
                  ))}
                </div>
              </ClientOnly>
              <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                See more
              </button>
            </div>
          ) : null}
          <div className="lg:block hidden border-b lg:ml-2 mt-2"></div>
          <div className="lg:block hidden text-[11px] text-gray-500">
            <p className="pt-4 px-2">
              About Newsroom TikTok Shop Contact Careers ByteDance
            </p>
            <p className="pt-4 px-2">
              TikTok for Good Advertise Developers Transparency TikTok Rewards
              TikTok Browse TikTok Embeds
            </p>
            <p className="pt-4 px-2">
              Help Safety Terms Privacy Creator Portal Community Guidelines
            </p>
            <p className="pt-4 px-2">© 2025 TikTok</p>
          </div>
        </div>
      </div>
    </>
  );
}
