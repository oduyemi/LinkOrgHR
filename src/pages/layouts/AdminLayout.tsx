import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Button,
  Text,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Image,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Bars3BottomLeftIcon,
  BoltIcon,
  CalendarDateRangeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentCurrencyDollarIcon,
  HomeIcon,
  UserPlusIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NotificationButton from "../../components/ui/NotificationButton";
import LogoutButton from "../../components/ui/LogoutButton";
import logo from "../../assets/images/logo/logo.png";

type SubmenuItem = {
  name: string;
  href: string;
};

type NavigationItem = {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  submenu?: SubmenuItem[];
};

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  // {
  //   name: "Recruitment",
  //   href: "#",
  //   icon: UserPlusIcon,
  //   current: false,
  //   submenu: [
  //     { name: "Job Postings", href: "onboarding/job-postings" },
  //     { name: "Applications", href: "onboarding/applications" },
  //     { name: "Resume Parsing", href: "onboarding/resume-parsing" },
  //     { name: "Interview Scheduling", href: "onboarding/interview-scheduling" },
  //     { name: "Onboarding Workflows", href: "onboarding/onboarding-workflows" },
  //     { name: "Onboarding Process", href: "onboarding/onboarding-process" },
  //   ],
  // },
  {
    name: "Employee",
    href: "#",
    icon: UsersIcon,
    current: false,
    submenu: [
      { name: "All Employees", href: "/employees" },
      { name: "Add Employee", href: "/employees/add" },
      { name: "Documents", href: "/employees/documents" },
    ],
  },
  {
    name: "Time & Attendance",
    href: "#",
    icon: CalendarDateRangeIcon,
    current: false,
    submenu: [
      { name: "Attendance", href: "attendance" },
      { name: "Leave Management", href: "attendance/leave-management" },
      { name: "Overtime Management", href: "attendance/overtime" },
      { name: "Time Tracking", href: "attendance/time-tracking" },
    ],
  },
  {
    name: "Payroll Management",
    href: "#",
    icon: CurrencyDollarIcon,
    current: false,
    submenu: [
      { name: "Salary Calculation", href: "payroll/salary-calculation" },
      { name: "Payslip Generation", href: "payroll/payslip-generation" },
      { name: "Tax Management", href: "payroll/tax-management" },
      {
        name: "Benefits Administration",
        href: "payroll/benefits-administration",
      },
      { name: "Insurance Management", href: "payroll/insurance-management" },
      { name: "Payroll Compliance", href: "payroll/payroll-compliance" },
    ],
  },
  {
    name: "Benefits Administration",
    href: "#",
    icon: DocumentCurrencyDollarIcon,
    current: false,
    submenu: [
      {
        name: "Insurance Management",
        href: "benefits/insurance-management",
      },
      {
        name: "Retirement & Benefits",
        href: "benefits/retirement-and-benefits",
      },
      {
        name: "Benefits Enrollment",
        href: "benefits/benefits-enrollment",
      },
      {
        name: "Benefits Reporting",
        href: "benefits/benefits-reporting",
      },
    ],
  },
  {
    name: "Performance Management",
    href: "#",
    icon: BoltIcon,
    current: false,
    submenu: [
      {
        name: "Goals & Objectives",
        href: "performance/goals-and-objectives",
      },
      {
        name: "Performance Reviews",
        href: "performance/performance-reviews",
      },
      {
        name: "Feedback & Development",
        href: "performance/feedback-and-development",
      },
      {
        name: "Self & Peer Reviews",
        href: "performance/self-and-peer-reviews",
      },
      {
        name: "Training & Development",
        href: "performance/training-and-development",
      },
    ],
  },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

export default function AdminLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <Box minH="100vh" bg="#010156" color={"#fff"}>
      {/* Mobile Sidebar */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="primary.1">
          <IconButton
            aria-label="Close sidebar"
            icon={<XMarkIcon width={20} height={20} />}
            onClick={onClose}
            mt={4}
            ml={4}
          />
          <VStack spacing={4} mt={6} align="start">
            <Image src={logo} alt="sitelogo" onClick={() => navigate("/")} />
            {navigation.map((item) => (
              <Box key={item.name} width="100%">
                <Link
                  to={item.href}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(item.name);
                    }
                  }}
                >
                  <HStack justify="flex-start" spacing={2}>
                    <item.icon width={20} height={20} />
                    <Text>{item.name}</Text>
                    {item.submenu?.length! > 0 && (
                      <ChevronDownIcon boxSize={4} />
                    )}
                  </HStack>
                </Link>
                {item.submenu && openSubmenus[item.name] && (
                  <VStack spacing={1} pl={8} align="start">
                    {item.submenu.map((subItem) => (
                      <Link key={subItem.name} to={subItem.href}>
                        <Text>{subItem.name}</Text>
                      </Link>
                    ))}
                  </VStack>
                )}
              </Box>
            ))}
          </VStack>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <Flex>
        <Box
          minH="100vh"
          display={{ base: "none", md: "block" }}
          w="64"
          bg="primary.1"
          p={5}
        >
          <VStack spacing={4} align="start">
            <Image src={logo} alt="sitelogo" onClick={() => navigate("/")} />
            {navigation.map((item) => (
              <Box key={item.name} width="100%">
                <Link
                  to={item.href}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(item.name);
                    }
                  }}
                >
                  <HStack justify="flex-start" spacing={2}>
                    <item.icon width={20} height={20} />
                    <Text>{item.name}</Text>
                    {item.submenu?.length! > 0 && (
                      <ChevronDownIcon boxSize={4} />
                    )}
                  </HStack>
                </Link>
                {item.submenu && openSubmenus[item.name] && (
                  <VStack spacing={1} pl={8} align="start">
                    {item.submenu.map((subItem) => (
                      <Link key={subItem.name} to={subItem.href}>
                        <Text>{subItem.name}</Text>
                      </Link>
                    ))}
                  </VStack>
                )}
              </Box>
            ))}
          </VStack>
        </Box>

        <Box flex="1" bg="white" p={6}>
          <Flex justify="space-between" mb={4}>
            <IconButton
              display={{ base: "block", md: "none" }}
              aria-label="Open menu"
              icon={<Bars3BottomLeftIcon width={20} height={20} />}
              onClick={onOpen}
            />

            <Box display={{ base: "none", md: "block" }}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon boxSize={4} color="gray.400" />}
                />
                <Input type="text" placeholder="Search" />
              </InputGroup>
            </Box>

            <HStack spacing={4}>
              <NotificationButton />
              <LogoutButton />
            </HStack>
          </Flex>

          {/* Content goes here */}
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
