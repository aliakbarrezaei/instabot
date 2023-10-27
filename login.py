from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
class LogInPage:

    def __init__(self,browser) -> None:
        self.browser = browser
        self.browser.get('https://www.instagram.com/')
        print('The Instagram webpage has been loaded')

    def login(self, username:str, password:str):

        is_continue = True
        while is_continue:
            try:
                username_input = self.browser.find_element(By.NAME,"username")
                password_input = self.browser.find_element(By.NAME,'password')
                username_input.send_keys(username)
                password_input.send_keys(password)
                is_continue = False
            except:
                try:
                    notif_button = self.browser.find_element(By.XPATH,"//button[@class='_a9-- _a9_0']").click() #find notif button and click it
                except:
                    pass
        print("username and password has been entered")      
        is_continue = True
        while is_continue:
            try:
                login_button = self.browser.find_element(By.XPATH,"//button[@type='submit']").click()
                is_continue = False
            except:
                try:
                    notif_button = self.browser.find_element(By.XPATH,"//button[@class='_a9-- _a9_0']").click() #find notif button and click it
                except:
                    pass
        sleep(15)

def main(username,password):
    browser = webdriver.Firefox()
    browser.implicitly_wait(1)
    global Login_page
    Login_page = LogInPage(browser)
    Login_page.login(username,password)
LogInPage = None


main()   #call this function
