#define _CRT_SECURE_NO_WARNINGS
#define MAX_LENGTH 10000	// 문자 갯수 제한

#include <stdio.h>		//헤더파일
#include <time.h>		//시간 헤더파일, 현재 날짜 출력 하기위해 사용
#include <windows.h>	//깔끔한 콘솔창 사용하기 위해서, 커서위치 이동하는 함수 구현
#include <stdlib.h>		//exit를 사용하여 종료하기위한것
#include <sys/stat.h>	//mkdir()함수를 이용하여 디렉토리를 만들기 위해 사용
#include <string.h>		//문자열 관련 처리를 위해 사용
#include <io.h>			// 파일 존재 여부 확인 헤더파일
#include <conio.h>		// 파일 존재 여부 확인 헤더파일







// ==============================================   함수 선언   ===================================================
void info();	//설명서
void printCalender(int inputYear, int inputMonth);	// 시작후 년도, 월 입력시 해당 캘린더 출력, 시각자료
int mainScreen();									// 메인스크린에서의 기능들 (printCalender 와 같이사용)
int leapYear(int year);								// 윤년 계산식
void inputScreen(year, month);						// 입력창 함수
void printTitle();									// inputScreen 화면에 Title 출력
void makeFolder(year, month);						// 폴더 생성 함수
void printSaveInfo();								// 파일 저장 안내문구
void diary();										// 다이어리 창 함수
int checkFileExists();								// 파일 존재 여부 체크 함수
int moveToTrashcan(char* prePath, char* postPath);	// 파일을 trashcan으로 이동시키는 함수
void trashcan();									// 휴지통 기능을 하는 함수




// ==============================================   구조체 ===================================================
struct mainData {
	int year, month;
}mainData;

struct inputScreenData {
	char strPath[40];				// 문자열을 합치기 위한 큰 틀(폴더의 경로가 저장된다.)
	char strYear[20];				// year값을 문자열로 받기 위한 문자 배열
	char strMonth[20];				// month값을 문자열로 받기 위한 문자 배열
	char input[MAX_LENGTH];			// 글 내용을 담는 변수
	char titleDay[20];				// 타이틀 날짜
	char titleName[20];				// 제목
	char strProjectFolder[40];
	char basic[20];					// 문자열로 "projectMamul"를 추가하기 위한 변수
	char fileName[20];				// 파일이름
	char getContents[100];			// 가져올 내용을 담을 변수
} screenData;

struct diaryData {
	char year[20];
	char month[20];
	char input[10000];
	char fileName[20];
	char strPath[40];
	char basic[20];
	char filePath[40];
	char inputFileName[20];
	char getContents[100];
	char deleteFileName[20];
} diaryData;

struct trashData {
	char strTrashFolder[40];
	char filePath[40];
} trashData;




//=================================== 메인 함수 ==========================================
int main(void) {
	int first;
	int start = 0;
	// 추가된 항목(day0518)
	int returnValue = 0;	// mainScreen에서 선택한 기능의 리턴값(1.작성, 2.수정 3.삭제 4.메인화면)

	system("title ProjectMamuli");

	// 휴지통 폴더 미리 만들기
	mkdir("/projectMamuli/trash");

	while (1) {
		//메인화면
		printf("\n\n\n\n\n");
		printf("\t                    **************\n");
		printf("\t                    Project Mamuli\n");
		printf("\t                    **************\n");
		printf("\n\n\n\n");
		printf("\t\t원하시는 기능을 입력하세요 ex) 1 (enter)\n\n\n");
		printf("\t  1. 시작    2. 도움말    3. 다이어리    4. 휴지통    0. 종료\n\n");
		printf("			:");
		scanf("%d", &first);


		// 메인화면 기능
		switch (first) {
		case 1:
			system("cls");
			printf("\t원하는 날짜를 입력하시오.(ex.2022 05) : ");
			scanf_s("%d %d", &mainData.year, &mainData.month);
			returnValue = mainScreen();

			break;

		case 2:
			system("cls");
			info();		//설명서 띄워주기

			returnValue = 4;
			break;	// 도움말에서 나온다.

		case 3:
			diary();

			returnValue = 4;
			break;
		case 4:
			printf("\n<휴지통>\n");

			trashcan();

			break;
		case 0:
			printf("			프로그램을 종료합니다.");
			exit(0);		//종료
		}


		// mainScreen 기능
		switch (returnValue) {
		case 1:// 1. 작성 기능
			inputScreen(mainData.year, mainData.month);		// 입력 함수 호출

			system("cls");
			break;

		case 2: // 2. 또 다른 기능
			printf("다른 기능 아이디어 좀 생각해봐~");

			break;
		}
	}
	return 0;
}




//메인화면 함수 (입력받아서 날짜에 맞게 출력)
int mainScreen() {
	int choice;	// 기능 선택 변수
	int returnValue = 0;	// main함수로 리턴해줄 반환변수

	// "캘린더 함수 호출"
	printCalender(mainData.year, mainData.month);	// main에서 받아온 inputYear값과 inputMonth값을 캘린더 함수에 넣어준다.

	while (1)
	{
		printf("\n\n\n\t기능 선택: 1. 작성    2. 날짜 수정   3. 메인화면\n");
		printf("\t입력 : ");
		scanf_s("%d", &choice);
		system("cls");
		if (choice == 1) {
			printCalender(mainData.year, mainData.month);
			printf("\n\t-------------------------------------------------\n");
			printf("\t파일 작성 기능으로 이동합니다.\n");
			printf("\t1초 후 파일 작성 기능으로 이동합니다...");
			printf("\n\t-------------------------------------------------\n");
			Sleep(1000);
			returnValue = 1;
			break;
		}
		else if (choice == 2) {
			printf("\n\t-------------------------------------------------\n");
			printf("\t날짜 수정 기능으로 이동합니다.\n");
			printf("\t1초 후 수정 기능으로 이동합니다...");
			printf("\n\t-------------------------------------------------\n");
			Sleep(1000);
			system("cls");
			printf("\t원하는 날짜를 입력하시오.(ex.2022 05) : ");
			scanf_s("%d %d", &mainData.year, &mainData.month);
			printCalender(mainData.year, mainData.month);
			continue;
		}
		else if (choice == 3) {
			printCalender(mainData.year, mainData.month);
			printf("\n\t-------------------------------------------------\n");
			printf("\t3초 후 메인화면으로 돌아갑니다...\n");
			Sleep(1000);
			printf("\t2초 후 메인화면으로 돌아갑니다...\n");
			Sleep(1000);
			printf("\t1초 후 메인화면으로 돌아갑니다...");
			printf("\n\t-------------------------------------------------\n");
			Sleep(1000);

			system("cls");
			return;
		}
		else {
			printCalender(mainData.year, mainData.month);
			printf("\n\t1, 2, 3 중 입력하시오.\n");
		}

	}

	return returnValue;
}



//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 캘린더 출력
void printCalender(int inputYear, int inputMonth) {
	int sum = 365;				// 1년 일수
	int start_date = 0;			// 1일이 시작되는 요일을 정하는 변수
	int total_days[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

	// 윤년일 경우, 2월에 날짜 수는 28 -> 29일 로 바뀌어야 하므로 1을 더해준다.
	if (leapYear(inputYear)) {
		total_days[1]++;
	}

	// 0년부터 입력한 년도까지 날짜를 모두 더함
	for (int i = 1; i < inputYear; i++) {
		if (leapYear(i)) {
			sum += 366;
		}
		else {
			sum += 365;
		}
	}

	// 남은 달의 날짜를 모두 더함.
	// inputMonth - 1을 하는 이유는, 현재 달 전까지 계산하기 위해서임.
	for (int i = 0; i < inputMonth - 1; i++) {
		sum += total_days[i];
	}

	// 모두 더한 날짜를 7일 단위로 나누어 나머지를 구함.
	// 0 = 일, 1 = 월, 2 = 화, 3 = 수, 4 = 목, 5 = 금, 6 = 토
	start_date = sum % 7;

	// 현재 year, month 정보 출력
	printf("\n\t===================================================\n");
	printf("\n\t\t\t   %d년 %d월\n", inputYear, inputMonth);
	// 요일 출력
	printf("\n\t---------------------------------------------------");
	printf("\n\t일\t월\t화\t수\t목\t금\t토");
	printf("\n\t---------------------------------------------------\n");
	// 일 출력
	// 1일 시작 지점 결정
	for (int i = 0; i < start_date; i++) {
		printf("\t");
	}

	// 날짜 나열
	for (int i = 1; i <= total_days[inputMonth - 1]; i++) {
		printf("\t%2d  ", i);

		// start_date가 6이 되면, 7일이 한 줄에 모두 채워지므로 그 다음 줄로 개행시켜준다.
		if (start_date == 6) {
			printf("\n\n");
			// 0으로 초기화해서 다음 줄부터 다시 시작.
			start_date = 0;
		}
		else {
			start_date++;
		}
	}
	printf("\n");
}

// 윤년, 평년 구분을 위한 함수
int leapYear(int year) {
	int leapyear;

	if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
		leapyear = 1;	// 윤년일 경우, 1
	}
	else {
		leapyear = 0;	// 평년일 경우, 0
	}

	return leapyear;	// 윤년,평년 판단한 값 반환
}



//도움말 화면 함수
void info() {
	int infoMenu;
	printf("\n\n\n	1. 주의사항 2. 일기입력 3. 파일 저장 위치 0. 메인메뉴\n\n\n");

	printf("	-------------------------------------------------\n");
	printf("	프로젝트 마무리는 다이어리 작성 프로그램입니다.\n");
	printf("	효율적으로 다이어리 파일을 관리하는데 도움을 줍니다.\n");
	printf("	프로그램을 사용해서 효과적으로 파일을 관리해보세요. \n");
	printf("	--------------------------------------------------\n");
	printf("			:");

	while (1)
	{
		scanf_s("%d", &infoMenu);
		system("cls");
		switch (infoMenu) {
		case 1:
			printf("\n\n\n	1. 주의사항 2. 일기입력 3. 파일 저장 위치 0. 메인메뉴\n\n\n");
			printf("	① 인상깊었던 하루를 적어보세요.\n	② 에러가난다면 다시시작해주세요\n");
			printf("	③ 기능 이외의 선택은 참아주세요.\n	④ 이 다이어리는 보호받지 못합니다(업데이트예정)\n");

			printf("			:");
			break;
		case 2:
			printf("\n\n\n	1. 주의사항 2. 일기입력 3. 파일 저장 위치 0. 메인메뉴\n\n\n");
			printf("	일기를 입력하려면 날짜를 순서대로 기입하고 해당 날짜에 일기를 작성하면됩니다.\n");
			printf("	일기를 작성 뿐 아니라 삭제, 수정과 같은 기능을 사용할 수 있습니다.\n");
			printf("	일기를 작성했으면 해당 날짜를 찾아들어가 작성한 일기를 확인해보세요~~\n");
			printf("	작성한 일기는 파일로 남으니 (3. 파일 저장 위치)에 들어가서 저장되는 위치를 확인하세요.\n");

			printf("			:");
			break;
		case 3:
			printf("\n\n\n	1. 주의사항 2. 일기입력 3. 파일 저장 위치 0. 메인메뉴\n\n\n");
			printf("	저장위치▶ C:\projectMamuli\n");

			printf("			:");
			break;
		case 0:
			printf("\n\n\n	1. 주의사항 2. 일기입력 3. 파일 저장 위치 0. 메인메뉴\n\n\n");
			printf("	3초 후 메인화면으로 돌아갑니다...\n");
			Sleep(1000);
			printf("	2초 후 메인화면으로 돌아갑니다...\n");
			Sleep(1000);
			printf("	1초 후 메인화면으로 돌아갑니다...\n");
			Sleep(1000);

			system("cls");
			return;

		default:
			printf("\n\n\n	1. 주의사항 2. 일기입력 3. 파일 저장 위치 0. 메인메뉴\n\n\n");
			printf("	→→→1, 2, 3, 0 중에 입력하세요←←←\n");
			printf("			:");
			break;

		}

	}
}




// 입력창 함수
void inputScreen(year, month) {
	system("cls");
	printCalender(year, month);
	int getch;											// getchar의 리턴값을 저장할 변수(EOF의 반환값을 받기 위해)
	unsigned int index = 0;
	int choice1 = 0, choice2 = 0, check = 0;

	// 폴더 생성
	makeFolder(year, month);

	// 파일 이름 및 파일 경로 만들기
	printf("\n\n\t%s월 날짜 입력(ex.20220525): ", screenData.strMonth);
	scanf("%s", screenData.titleDay);
	system("cls");

	strcpy(screenData.fileName, screenData.titleDay);				// ex)20220601
	strcat(screenData.fileName, ".txt");							// ex)20220601.txt
	strcat(screenData.strPath, "\/");								// ex)/projectMamuli/2022/06/
	strcat(screenData.strPath, screenData.fileName);				// ex)/projectMamuli/2022/06/20220601.txt

	// 파일 존재 여부 확인
	check = checkFileExists();

	// -------------- 파일 생성 시작 --------------
	FILE* file;

	file = fopen(screenData.strPath, "at");

	// 파일이 존재하지 않으면 새로 작성한다.
	if (check == 0) {
		// 새로 작성할 때마다 초기화 되지않고 "추가 작성"이 됨.
		printTitle();
		// 파일에 day, 제목 넣기
		fputs("-------------------------------------------------------------------\n", file);
		fputs("\t\tday: ", file);
		fputs(screenData.titleDay, file);
		fputs(" \| 제목 : ", file);
		fputs(screenData.titleName, file);
		fputs("\n-------------------------------------------------------------------\n", file);
		fputs("내용: \n\n", file);
	}
	// 파일이 존재하면 추가 내용 입력을 한다.
	else if (check == 1) {
		fclose(file);
		file = fopen(screenData.strPath, "r");
		while (feof(file) == 0) {
			fgets(screenData.getContents, 100, file);
			printf("%s\n", screenData.getContents);
		}
		fclose(file);
		printf("\n-------------------------------------------------------------------\n");
		printf("추가 내용 입력: \n\n");
		file = fopen(screenData.strPath, "at");
	}


	// 파일에 내용 넣기
	getchar();
	while (1) {
		getch = getchar();
		if (getch == -1) {
			screenData.input[index] = NULL;				// NULL값을 넣으니, ctrl + z 누를 시 글이 깨지던 오류가 사라짐.
			break;
		}
		screenData.input[index] = getch;				// 문자 하나가 screenData.input[index]에 담김.
		index++;
	}
	fprintf(file, "%s\n", screenData.input);

	//fputs("\n", file);

	fclose(file);

	Sleep(500);
	printSaveInfo();

	while (1) {
		// 기능 선택1
		system("cls");
		printf("\n-------------------------------------------------------------------\n");
		printf("1. 작성한 내용 보기\t2. 메인화면\n: ");
		scanf("%d", &choice1);

		if (choice1 == 1) {
			system("cls");
			// 파일 내용 가져와서 출력하기
			file = fopen(screenData.strPath, "r");
			while (feof(file) == 0) {
				fgets(screenData.getContents, 100, file);
				printf("%s", screenData.getContents);
			}
			fclose(file);


			printf("-------------------------------------------------------------------\n");
			// 기능 선택2
			printf("1. 수정\t2. 이전화면\n: ");
			scanf("%d", &choice2);

			switch (choice2) {
				// 1. 수정하기
			case 1:

				printf("\n\n============================== 수정화면 =============================\n\n");

				// 타이틀 출력
				printTitle();

				file = fopen(screenData.strPath, "wt");


				// 파일에 day, 제목 넣기
				fputs("-------------------------------------------------------------------\n", file);
				fputs("\t\tday: ", file);
				fputs(screenData.titleDay, file);
				fputs(" \| 제목 : ", file);
				fputs(screenData.titleName, file);
				fputs("\n-------------------------------------------------------------------\n", file);
				fputs("내용: \n\n", file);

				// 파일에 내용 넣기
				getchar();
				while (1) {
					getch = getchar();
					if (getch == -1) {
						screenData.input[index] = NULL;				// NULL값을 넣으니, ctrl + z 누를 시 글이 깨지던 오류가 사라짐.
						break;
					}
					screenData.input[index] = getch;				// 문자 하나가 screenData.input[index]에 담김.
					index++;
				}
				fprintf(file, "%s\n", screenData.input);

				//fputs("\n", file);

				fclose(file);

				Sleep(500);
				printSaveInfo();
				break;

				// 2. 이전화면으로 이동
			case 2:
				system("cls");
				printf("\n-------------------------------------------------------------------\n");
				printf("	2초 후 이전화면으로 돌아갑니다...\n");
				Sleep(1000);
				printf("	1초 후 이전화면으로 돌아갑니다...\n");
				printf("-------------------------------------------------------------------\n");
				Sleep(1000);
				break;
			default:
				system("cls");
				printf("\n-------------------------------------------------------------------\n");
				printf("1과 2 중 하나를 선택하세요.");
				printf("\n-------------------------------------------------------------------\n");
				continue;
			}
		}
		else if (choice1 == 2) {
			printf("\n-------------------------------------------------------------------\n");
			printf("	2초 후 메인화면으로 돌아갑니다...\n");
			Sleep(1000);
			printf("	1초 후 메인화면으로 돌아갑니다...\n");
			printf("\n-------------------------------------------------------------------\n");
			Sleep(1000);
			break;
		}
		else {
			printf("\n-------------------------------------------------------------------\n");
			printf("\n1과 2 둘 중 하나 선택하시오.\n");
			printf("\n-------------------------------------------------------------------\n");
		}
	}
}


// 파일 존재 여부 체크 함수
int checkFileExists() {
	FILE* file;
	if (file = fopen(screenData.strPath, "r")) {
		fclose(file);
		return 1;
	}
	return 0;
}


// 폴더 생성 함수
void makeFolder(year, month) {
	strcpy(screenData.strProjectFolder, "c:\\projectMamuli");
	strcpy(screenData.basic, "projectMamuli");

	// int형 year, month를 문자열로 변환
	sprintf(screenData.strYear, "%d", year);
	sprintf(screenData.strMonth, "%d", month);

	// -------------- 폴더 생성 시작 --------------
	// c드라이브에 projectMamuli 폴더 생성
	mkdir(screenData.strProjectFolder);

	// 연도 폴더 생성
	strcpy(screenData.strPath, "\/");
	strcat(strcat(strcat(screenData.strPath, screenData.basic), "\/"), screenData.strYear);
	// -> ex. /projectMamuli/2022
	mkdir(screenData.strPath);

	// 월 폴더 생성
	strcat(strcat(screenData.strPath, "\/"), screenData.strMonth);
	// -> ex. /projectMamuli/2022/06
	mkdir(screenData.strPath);
}


// inputScreen 날짜 기입 함수
void printTitle() {
	printf("----------------------------------------\n");
	printf("day: %s | 제목 : ", screenData.titleDay);
	scanf("%s", screenData.titleName);
	printf("----------------------------------------");

	printf("\n[내용 저장방법: enter -> ctrl + z -> enter]\n");
	printf("내용 : \n\n");
}


// 파일 저장 안내문구
void printSaveInfo() {
	for (int i = 0; i < 2; i++) {
		system("cls");
		printf("\n\n\n\n\t\t**************\n");
		printf("\n\t\t파일 저장중.\n");
		printf("\n\t\t**************\n");
		Sleep(300);
		system("cls");
		printf("\n\n\n\n\t\t**************\n");
		printf("\n\t\t파일 저장중..\n");
		printf("\n\t\t**************\n");
		Sleep(300);
		system("cls");
		printf("\n\n\n\n\t\t**************\n");
		printf("\n\t\t파일 저장중...\n");
		printf("\n\t\t**************\n");
		Sleep(300);
	}
}



// 다이어리 창 함수
void diary() {
	int year, month;
	int choice1 = 0, choice2 = 0;
	FILE* file;

	struct _finddatai64_t findData;
	intptr_t hFile;
	char path[] = "/*.*";
	char prePath[40], postPath[40];

	while (1) {
		system("cls");
		printf("원하는 날짜 입력(ex. 2022 06): ");
		scanf("%d %d", &year, &month);

		if (year <= 2000 || year >= 3000) {
			system("cls");
			printf("\n--------------------------------------------------------\n");
			printf("******************* Warning *******************\n\n2000년도 이상, 3000년도 이하 숫자를 적어주세요!\n");
			printf("\n--------------------------------------------------------");
			Sleep(2500);
			continue;
		}
		if (month < 1 || month > 12) {
			system("cls");
			printf("\n--------------------------------------------------------\n");
			printf("******************* Warning *******************\n\n1월 ~ 12월을 값을 입력해주세요!\n");
			printf("\n--------------------------------------------------------");
			Sleep(2500);
			continue;
		}

		// 경로 설정하기
		sprintf(diaryData.year, "%d", year);							// int형인 year, month값을 문자열 형태바꾼뒤, diaryData.year 변수에 넣어줌.
		sprintf(diaryData.month, "%d", month);

		strcpy(diaryData.fileName, diaryData.year);						// ex)2022
		strcat(diaryData.fileName, "\/");								// ex)2022/
		strcat(diaryData.fileName, diaryData.month);					// ex)2022/5
		strcpy(diaryData.strPath, "\/projectMamuli\/");					// ex)/projectMamuli/
		strcat(diaryData.strPath, diaryData.fileName);					// ex)/projectMamuli/2022/5


		// 각 파일을 이용하기 위한 경로 설정
		strcpy(diaryData.filePath, diaryData.strPath);					// filePath에 따로 copy해둠.
		strcat(diaryData.filePath, "/");								// ex)/projectMamuli/2022/5/

		system("cls");
		printf("\n입력 날짜: %s %s\n\n", diaryData.year, diaryData.month);


		strcat(diaryData.strPath, path);

		// 파일 존재 유무 확인 및 파일 목록 출력
		if ((hFile = _findfirsti64(diaryData.strPath, &findData)) == -1L) {
			switch (errno) {
			case ENOENT:
				printf("파일이 없습니다.");	break;
			case EINVAL:
				printf(stderr, "잘못된 경로 이름입니다..\n"); exit(1); break;
			case ENOMEM:
				printf(stderr, "메모리가 부족하거나 파일 이름이 너무 깁니다.\n"); exit(1); break;
			default:
				printf(stderr, "알수없는 오류가 발생했습니다.\n"); exit(1); break;
			}
		}
		else {
			printf("----------------------------- 파일 목록 -----------------------------\n\n");
			do {
				printf("%s\n", findData.name);
			} while (_findnexti64(hFile, &findData) == 0);
			_findclose(hFile);
		}


		// 날짜 재입력 or 메인화면
		printf("\n\n======================================================================");
		printf("\n1. 날짜 재입력     2. 작성한 내용 보기     3. 삭제하기     4. 메인화면\n: ");
		scanf("%d", &choice1);

		if (choice1 == 1) {
			system("cls");
			printf("\n\n-------------------------------------------------------------------\n");
			printf("\t1초 후 날짜 재입력 창으로 이동합니다..\n");
			printf("-------------------------------------------------------------------\n");
			Sleep(1000);
			system("cls");
			continue;
		}
		else if (choice1 == 2) {
			printf("\n\n===================================================================\n");
			printf("원하는 파일명 입력: ");
			scanf("%s", diaryData.inputFileName);
			// 파일 내용 가져와서 출력하기
			strcat(diaryData.filePath, diaryData.inputFileName);
			strcat(diaryData.filePath, ".txt");								// ex./projectMamuli/2022/6/20220601.txt

			system("cls");
			file = fopen(diaryData.filePath, "r");
			while (feof(file) == 0) {
				fgets(diaryData.getContents, 100, file);
				printf("%s\n", diaryData.getContents);
			}
			fclose(file);

			printf("\n\n===================================================================\n");
			printf("1. 이전화면     2. 메인화면\n: ");
			scanf("%d", &choice2);
			if (choice2 == 1) {
				system("cls");
				printf("\n-------------------------------------------------------------------\n");
				printf("	1초 후 이전화면으로 돌아갑니다...\n");
				printf("-------------------------------------------------------------------\n");
				Sleep(1000);
				continue;
			}
			else {
				system("cls");
				printf("\n-------------------------------------------------------------------\n");
				printf("	1초 후 메인화면으로 돌아갑니다...\n");
				printf("-------------------------------------------------------------------\n");
				Sleep(1000);
				system("cls");
				break;
			}
		}
		else if (choice1 == 3) {

			printf("\n\n===================================================================\n");
			printf("삭제할 파일명 입력: ");
			scanf("%s", diaryData.deleteFileName);
			// 삭제할 파일 불러와서 삭제하기

			// 기존 경로
			strcat(diaryData.filePath, diaryData.deleteFileName);
			strcat(diaryData.filePath, ".txt");								// ex./projectMamuli/2022/6/20220601.txt
			printf("기존경로: %s\n", diaryData.filePath);
			Sleep(1000);


			// 바뀐 경로
			strcpy(trashData.strTrashFolder, "/projectMamuli/trash/");
			strcpy(trashData.filePath, trashData.strTrashFolder);			// c:\\projectMamuli/trash/
			strcat(trashData.filePath, diaryData.deleteFileName);			// c:\\projectMamuli/trash/20220601
			strcat(trashData.filePath, ".txt");								// c:\\projectMamuli/trash/20220601.txt
			printf("바뀐 경로: %s\n", trashData.filePath);
			Sleep(1000);


			strcpy(prePath, diaryData.filePath);
			strcpy(postPath, trashData.filePath);


			if (moveToTrashcan(prePath, postPath) == 0)
			{
				system("cls");
				remove(diaryData.filePath);
				printf("\n---------------------------------------------------------\n");
				printf("	파일 삭제중...");
				printf("\n---------------------------------------------------------\n");
				Sleep(2000);
				system("cls");
				printf("\n---------------------------------------------------------\n");
				printf("     휴지통으로 이동하였습니다.\n");
				printf("     삭제된 파일: %s", postPath);
				printf("\n---------------------------------------------------------\n");
				Sleep(2000);
			}
			else
			{
				system("cls");
				printf("\n---------------------------------------------------------\n");
				printf("	파일 삭제중...");
				printf("\n---------------------------------------------------------\n");
				Sleep(2000);
				printf("\n---------------------------------------------------------\n");
				perror("	파일 삭제 『실패』");
				printf("\n---------------------------------------------------------\n");
				Sleep(2000);
			}

		}
		else if (choice1 == 4) {
			system("cls");
			printf("\n-------------------------------------------------------------------\n");
			printf("\n\t2초 후 메인화면으로 돌아갑니다...\n");
			Sleep(1000);
			printf("\t1초 후 메인화면으로 돌아갑니다...\n\n");
			printf("\n-------------------------------------------------------------------\n");
			Sleep(1000);
			system("cls");
			break;
		}
		else {
			system("cls");
			printf("\n-------------------------------------------------------------------\n\n");
			printf("********** Warning **********\n\n잘못 입력하였습니다.\n");
			printf("\n-------------------------------------------------------------------");
			Sleep(2000);
			system("cls");
		}
	}
}



//휴지통으로 이동 함수
int moveToTrashcan(char* prePath, char* postPath) {
	FILE* fp1, * fp2;
	char buffer[1000] = { 0, };

	printf("%s\n", prePath);
	printf("%s\n", postPath);

	fp1 = fopen(prePath, "r");
	fp2 = fopen(postPath, "w");


	if (fp1 == NULL) {
		printf("원본 파일을 열 수 없습니다.");
		return -1;
	}

	if (fp2 == NULL) {
		printf("복사 파일을 열 수 없습니다.");
		return -1;
	}

	while (fgets(buffer, 500, fp1) != NULL) {
		fgets(buffer, 500, fp1);
		fputs(buffer, fp2);
	}

	//printf("복사 정상적으로 되었습니다.");

	fclose(fp1);
	fclose(fp2);

	return 0;
}


// 휴지통 함수
void trashcan() {
	system("cls");
	struct _finddatai64_t findData;
	intptr_t hFile;
	char path[] = "/*.*";
	char basePath[40];
	int choice = 0;

	strcpy(basePath, "/projectMamuli/trash");
	strcat(basePath, path);

	while (1) {
		// 파일 존재 유무 확인 및 파일 목록 출력
		if ((hFile = _findfirsti64(basePath, &findData)) == -1L) {
			switch (errno) {
			case ENOENT:
				printf("파일이 없습니다.");	break;
			case EINVAL:
				printf(stderr, "잘못된 경로 이름입니다..\n"); exit(1); break;
			case ENOMEM:
				printf(stderr, "메모리가 부족하거나 파일 이름이 너무 깁니다.\n"); exit(1); break;
			default:
				printf(stderr, "알수없는 오류가 발생했습니다.\n"); exit(1); break;
			}
		}
		else {
			printf("------------------------ 파일 목록 ------------------------\n\n");
			do {
				printf("%s\n", findData.name);
			} while (_findnexti64(hFile, &findData) == 0);
			_findclose(hFile);
		}

		printf("\n\n=========================================================\n");
		printf("1. 메인화면\n:");
		scanf_s("%d", &choice);
		if (choice == 1) {
			printf("\n---------------------------------------------------------\n");
			printf("\t1초 후 메인화면으로 돌아갑니다...\n");
			printf("---------------------------------------------------------\n");
			Sleep(1000);
			system("cls");
			break;
		}
		else {
			break;
		}
	}
}